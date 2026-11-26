const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const server = require('../server');
let base;
before(async () => { await new Promise(resolve => server.listen(0, '127.0.0.1', resolve)); base = `http://127.0.0.1:${server.address().port}`; });
after(async () => { await new Promise(resolve => server.close(resolve)); });
test('catalog and promotions are available to the storefront', async () => {
  const products = await (await fetch(`${base}/api/products`)).json();
  const promotions = await (await fetch(`${base}/api/promotions`)).json();
  assert.ok(products.length > 0);
  assert.ok(products.every(product => product.id && product.price > 0));
  assert.equal(new Set(products.map(product => product.id)).size, products.length);
  assert.ok(promotions.length > 1);
});
test('checkout does not claim a payment without a provider', async () => {
  const response = await fetch(`${base}/api/checkout`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ payment: 'pix' }) });
  assert.equal(response.status, 503);
  assert.match((await response.json()).error, /provedor de pagamento/);
});
test('unknown API routes return JSON 404', async () => {
  const response = await fetch(`${base}/api/missing`);
  assert.equal(response.status, 404);
  assert.match(response.headers.get('content-type'), /application\/json/);
});
