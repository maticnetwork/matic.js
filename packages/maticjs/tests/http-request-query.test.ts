/**
 * Regression tests for query-string handling in HttpRequest.get.
 *
 * Background
 * ----------
 * `HttpRequest.get(url, query)` built its URL as `baseUrl + url + query` with no
 * separator, so `get('index.json', { page: 1 })` requested
 * `<base>index.jsonpage=1` — a different path that no server routes. The
 * parameters were also dropped entirely when `url` already carried a query
 * string. These tests record the request line the server actually receives.
 */
import type { Server } from 'node:http';

import { createServer } from 'node:http';

import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { HttpRequest } from '../src/utils/http_request';

let server: Server;
let baseUrl: string;
let requestedUrl = '';

beforeAll(async () => {
  server = createServer((req, res) => {
    requestedUrl = req.url ?? '';
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end('{}');
  });
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const addr = server.address();
  if (addr === null || typeof addr === 'string') throw new Error('failed to bind test server');
  baseUrl = `http://127.0.0.1:${addr.port}/`;
});

afterAll(async () => {
  await new Promise<void>((resolve, reject) =>
    server.close((err) => (err ? reject(err) : resolve()))
  );
});

describe('HttpRequest.get query string', () => {
  it('leaves the path untouched when no query is passed', async () => {
    await new HttpRequest(baseUrl).get('index.json');

    expect(requestedUrl).toBe('/index.json');
  });

  it('appends query parameters with a ? separator and encodes them', async () => {
    await new HttpRequest(baseUrl).get('index.json', { page: 1, 'a b': 'x y' });

    expect(requestedUrl).toBe('/index.json?page=1&a%20b=x%20y');
  });

  it('appends to an existing query with & instead of a second ?', async () => {
    await new HttpRequest(baseUrl).get('index.json?network=mainnet', { page: 1 });

    expect(requestedUrl).toBe('/index.json?network=mainnet&page=1');
  });
});
