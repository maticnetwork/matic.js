---
'@maticnetwork/maticjs': patch
---

Fix query-string handling in `HttpRequest.get`. The encoded `query` map was concatenated straight onto the path with no separator, so `get('index.json', { page: 1 })` requested `<base>index.jsonpage=1` — a path no server routes — and parameters were dropped when `url` already contained a query string. The map is now joined with `?` (or `&` when the path already has a query). No internal caller passes `query` today, so the built-in metadata and proof requests are unaffected.
