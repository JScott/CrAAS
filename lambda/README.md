# Usage

Upload this to Amazon Lambda and call it through `aws lambda invoke-async`.

# Data

## Request data format

```
{
  "crawl": {
    "host": required,
    "path": "/",
    "port": 80
  },
  "callback": {
    "host": required,
    "path": "/",
    "port": 80
  }
}
```

## Callback data format

- `url` - URL crawled
- `html` - URI encoded data for the HTML found at that URL

## Error handling

If there's an error, CrAAS will return `url` as `null` and `html` as the error message.
