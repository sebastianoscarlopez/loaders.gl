// From https://github.com/rauschma/async-iter-demo/tree/master/src under MIT license
// http://2ality.com/2016/10/asynchronous-iteration.html

class ArrayQueue extends Array {
  enqueue(value) {
    // Add at the end
    return this.push(value);
  }
  dequeue() {
    // Remove first element
    return this.shift();
  }
}

export default class AsyncQueue {
  private _values: ArrayQueue;
  private _settlers: ArrayQueue;
  private _closed: boolean;

  constructor() {
    // enqueues > dequeues
    this._values = new ArrayQueue();
    // dequeues > enqueues
    this._settlers = new ArrayQueue();
    this._closed = false;
  }

  close(): void {
    while (this._settlers.length > 0) {
      this._settlers.dequeue().resolve({done: true});
    }
    this._closed = true;
  }

  [Symbol.asyncIterator](): AsyncIterator<any> {
    return this;
  }

  enqueue(value: any): void {
    if (this._closed) {
      throw new Error('Closed');
    }

    if (this._settlers.length > 0) {
      if (this._values.length > 0) {
        throw new Error('Illegal internal state');
      }
      const settler = this._settlers.dequeue();
      if (value instanceof Error) {
        settler.reject(value);
      } else {
        settler.resolve({value});
      }
    } else {
      this._values.enqueue(value);
    }
  }

  /**
   * @returns a Promise for an IteratorResult
   */
  next(): Promise<any> {
    if (this._values.length > 0) {
      const value = this._values.dequeue();
      if (value instanceof Error) {
        return Promise.reject(value);
      }
      return Promise.resolve({value});
    }

    if (this._closed) {
      if (this._settlers.length > 0) {
        throw new Error('Illegal internal state');
      }
      return Promise.resolve({done: true});
    }
    // Wait for new values to be enqueued
    return new Promise((resolve, reject) => {
      this._settlers.enqueue({resolve, reject});
    });
  }
}

/**
 * @returns a Promise for an Array with the elements in `asyncIterable`
 */
export async function takeAsync(
  asyncIterable: AsyncIterable<any>,
  count = Infinity
): Promise<any[]> {
  const result: Array<any> = [];
  const iterator = asyncIterable[Symbol.asyncIterator]();
  while (result.length < count) {
    const {value, done} = await iterator.next();
    if (done) {
      break;
    }
    result.push(value);
  }
  return result;
}
