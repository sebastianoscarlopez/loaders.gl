# Overview

The `@loaders.gl/json` module works with tabular data stored in the [JSON][format_json] file format.
A subset of streaming JSON formats, such as new-line delimited JSON are supported. 
GeoJSON is also supported

## Installation

```bash
npm install @loaders.gl/core @loaders.gl/json
```

## Loaders and Writers

| Loader                                                          |
| --------------------------------------------------------------- |
| [`JSONLoader`](modules/json/docs/api-reference/json-loader)     |
| [`NDJSONLoader`](modules/json/docs/api-reference/ndjson-loader) |
| [`GeoJSONLoader`](modules/json/docs/api-reference/geojson-loader)     |
| [`NDGeoJSONLoader`](modules/json/docs/api-reference/ndgeojson-loader) |

## Additional APIs

- See [table category](/docs/specifications/category-table).
- See [GIS category](/docs/specifications/category-gis).

## Data Format Notes

The `@loaders.gl/json` module can parse arbitrary JSON data but is optimized for loading
tabular, possibly geospatial, data stored in JSON arrays.


Several [JSON Streaming Formats](https://en.wikipedia.org/wiki/JSON_streaming) (Wikipedia) are supported,
however at the moment auto-detection is not implemented and two separate loaders are provided. 
File extensions or MIME types are specified allowing correct distinctions to be made in usage.

### MIME Types and File Extensions

| Format                          | Extension | MIME Media Type            | Support | Comment |
| ------------------------------- | --------- | ---------------------------| ------- |
| Standard [JSON][format_json]    | `.json`   | `application/json`         | Y |
| [Line-delimited JSON](format_jsonlines)     | `.jsonl`  | `application/x-ldjson`     | Y |
| NewLine delimited JSON          | `.ndjson` | `application/x-ndjson`     | Y | 
| Record separator-delimited JSON | -         | `application/json-seq`     | Partial | Records that span multiple lines are not supported. |
| [GeoJSON][format_geojson]    | `.json`   | `application/geo+json`         | Y |

[format_json]: https://www.json.org/json-en.html
[format_jsonlines]: http://jsonlines.org/
[rfc4288]: [https://www.ietf.org/rfc/rfc4288.txt
