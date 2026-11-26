const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const money = value => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
let products = [], promotions = [], slide = 0, filter = 'Todos', team = 'Todos', query = '';
let cart = {};
try { cart = JSON.parse(localStorage.getItem('arquibancada-cart') || '{}'); } catch { cart = {}; }

function productArt(product) {
  const [primary, accent] = product.colors;
  if (product.style === 'ball') return `<svg viewBox="0 0 240 240" aria-hidden="true"><defs><radialGradient id="ball-${product.id}" cx="35%" cy="25%"><stop stop-color="#fff"/><stop offset="1" stop-color="#cbd6d5"/></radialGradient></defs><circle cx="120" cy="120" r="75" fill="url(#ball-${product.id})" stroke="#aebbb9"/><path d="M120 75l25 18-9 29h-32l-9-29z" fill="${accent}"/><path d="M120 75V46M95 93 68 83M104 122 84 146M136 122l20 24M145 93l27-10M84 146l7 31M156 146l-7 31" fill="none" stroke="#a9b9b8" stroke-width="2"/><path d="M55 112l18-11 12 15-5 23-20 4M185 112l-18-11-12 15 5 23 20 4M100 182l20-14 20 14" fill="${accent}" opacity=".75"/></svg>`;
  if (product.style === 'scarf') return `<svg viewBox="0 0 240 240" aria-hidden="true"><g transform="rotate(-17 120 120)"><rect x="35" y="83" width="170" height="75" rx="3" fill="${primary}"/><path d="M35 94h170M35 147h170" stroke="${accent}" stroke-width="9"/><path d="M47 84v73M193 84v73" stroke="${accent}" stroke-width="12"/><text x="120" y="128" text-anchor="middle" fill="${accent}" font-family="sans-serif" font-size="23" font-weight="900">BRASIL</text><path d="M40 158v16m10-16v16m10-16v16m120-16v16m10-16v16m10-16v16" stroke="${accent}" stroke-width="3"/></g></svg>`;
  const stripes = product.style === 'stripes' ? `<path d="M81 50h20v142H81zM120 50h20v142h-20zM159 50h12v142h-12z" fill="${accent}" opacity=".95" clip-path="url(#shirt-${product.id})"/>` : '';
  return `<svg viewBox="0 0 240 240" aria-hidden="true"><defs><linearGradient id="fabric-${product.id}" x2="1" y2="1"><stop stop-color="#fff" stop-opacity=".18"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".13"/></linearGradient><clipPath id="shirt-${product.id}"><path d="M80 40 101 34q19 13 38 0l21 6 35 23 18 43-28 13-10-18-4 96H69l-4-96-10 18-28-13 18-43z"/></clipPath></defs><path d="M80 40 101 34q19 13 38 0l21 6 35 23 18 43-28 13-10-18-4 96H69l-4-96-10 18-28-13 18-43z" fill="${primary}"/>${stripes}<path d="M80 40 101 34q19 13 38 0l21 6 35 23 18 43-28 13-10-18-4 96H69l-4-96-10 18-28-13 18-43z" fill="url(#fabric-${product.id})"/><path d="M101 34q19 13 38 0l-5 11q-14 10-28 0z" fill="${accent}"/><path d="M33 91l29 13M207 91l-29 13" stroke="${accent}" stroke-width="5"/><path d="M72 185q48 5 96 0M74 77l-4 105M166 77l4 105" fill="none" stroke="#000" stroke-opacity=".08" stroke-width="2"/><path d="M145 70h16v15q-8 9-16 0z" fill="${accent}" stroke="#fff" stroke-opacity=".65" stroke-width="1"/><path d="M148 73h10v10q-5 5-10 0z" fill="${primary}"/><path d="M77 63l15-4" stroke="${accent}" stroke-width="3" opacity=".8"/></svg>`;
}
function renderProducts() {
  const visible = products.filter(p => (team === 'Todos' || p.team === team) && (filter === 'Todos' || filter === 'Ofertas' && p.oldPrice > p.price || p.category === filter) && `${p.name} ${p.team} ${p.category}`.toLocaleLowerCase('pt-BR').includes(query.toLocaleLowerCase('pt-BR')));
  $('#product-grid').innerHTML = visible.map(p => `<article class="product-card"><div class="product-image"><span class="product-tag">${p.tag}</span>${productArt(p)}<button class="quick-add" data-add="${p.id}" aria-label="Adicionar ${p.name} ao carrinho">+</button></div><div class="product-info"><div class="product-team">${p.flag} &nbsp; ${p.team.toUpperCase()} / ${p.category.toUpperCase()}</div><div class="product-name">${p.name}</div><div><span class="old-price">${money(p.oldPrice)}</span><span class="price">${money(p.price)}</span></div><div class="installment">ou 6x de ${money(p.price / 6)} sem juros</div></div></article>`).join('');
  $('#empty').hidden = visible.length > 0;
  $('#results-count').textContent = `${visible.length} ${visible.length === 1 ? 'produto' : 'produtos'}`;
  $$('.filters button').forEach(button => button.classList.toggle('active', button.dataset.filter === filter));
  $$('.team').forEach(button => button.classList.toggle('active', button.dataset.team === team));
}
function setFilter(value) { filter = value; team = 'Todos'; query = ''; $('#search').value = ''; renderProducts(); }
function renderSlide() {
  if (!promotions.length) return;
  const p = promotions[slide];
  $('#hero-eyebrow').textContent = p.eyebrow; $('#hero-title').innerHTML = p.title; $('#hero-description').textContent = p.description;
  $('#hero-button').innerHTML = `${p.button} <span>↗</span>`; $('#hero-button').dataset.filter = p.filter;
  $('#slide-number').textContent = String(slide + 1).padStart(2, '0'); $('#slide-progress').style.width = `${(slide + 1) / promotions.length * 100}%`;
}
function saveCart() { localStorage.setItem('arquibancada-cart', JSON.stringify(cart)); renderCart(); }
function cartTotal() { return products.reduce((sum, p) => sum + p.price * (cart[p.id] || 0), 0); }
function renderCart() {
  const items = products.filter(p => cart[p.id] > 0);
  $('#cart-count').textContent = items.reduce((sum, p) => sum + cart[p.id], 0);
  $('#cart-items').innerHTML = items.length ? items.map(p => `<div class="cart-item"><div class="cart-thumb">${productArt(p)}</div><div class="cart-item-info"><strong>${p.name}</strong><p>${money(p.price)}</p><div class="quantity"><button data-change="${p.id}" data-delta="-1" aria-label="Diminuir quantidade">−</button><span>${cart[p.id]}</span><button data-change="${p.id}" data-delta="1" aria-label="Aumentar quantidade">+</button><button class="remove" data-remove="${p.id}">Remover</button></div></div></div>`).join('') : '<p class="cart-empty">Seu carrinho está vazio.<br>Escolha sua seleção e entre em campo!</p>';
  $('#subtotal').textContent = money(cartTotal()); $('#checkout-button').disabled = !items.length;
}
function openCart() { $('#drawer').classList.add('open'); $('#drawer').setAttribute('aria-hidden', 'false'); $('#overlay').hidden = false; }
function closeCart() { $('#drawer').classList.remove('open'); $('#drawer').setAttribute('aria-hidden', 'true'); $('#overlay').hidden = true; }
function renderPayment() {
  const credit = $('input[name="payment"]:checked').value === 'credit';
  $('#installments-wrap').hidden = !credit;
  const total = cartTotal(); $('#payment-total').textContent = money(credit ? total : total * .95);
  $('#installments').innerHTML = Array.from({length: 6}, (_, i) => `<option value="${i + 1}">${i + 1}x de ${money(total / (i + 1))} sem juros</option>`).join('');
  $('#payment-message').textContent = '';
}
let toastTimer;
function toast(message) { $('#toast').textContent = message; $('#toast').classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => $('#toast').classList.remove('show'), 2500); }
document.addEventListener('click', event => {
  const add = event.target.closest('[data-add]');
  if (add) { const id = add.dataset.add; cart[id] = (cart[id] || 0) + 1; saveCart(); toast('Produto adicionado ao carrinho!'); }
  const change = event.target.closest('[data-change]');
  if (change) { const id = change.dataset.change; cart[id] = Math.max(0, (cart[id] || 0) + Number(change.dataset.delta)); if (!cart[id]) delete cart[id]; saveCart(); }
  const remove = event.target.closest('[data-remove]'); if (remove) { delete cart[remove.dataset.remove]; saveCart(); }
  const category = event.target.closest('[data-filter]'); if (category) setFilter(category.dataset.filter);
  const selection = event.target.closest('[data-team]'); if (selection) { team = selection.dataset.team; filter = 'Todos'; query = ''; $('#search').value = ''; renderProducts(); $('#produtos').scrollIntoView(); }
});
$('#search-form').addEventListener('submit', event => { event.preventDefault(); query = $('#search').value.trim(); filter = 'Todos'; team = 'Todos'; renderProducts(); $('#produtos').scrollIntoView(); $('#search-form').classList.remove('visible'); });
$('#search-toggle').addEventListener('click', () => { $('#search-form').classList.toggle('visible'); $('#search').focus(); });
$('#view-all').addEventListener('click', () => setFilter('Todos'));
$('#prev-slide').addEventListener('click', () => { slide = (slide - 1 + promotions.length) % promotions.length; renderSlide(); });
$('#next-slide').addEventListener('click', () => { slide = (slide + 1) % promotions.length; renderSlide(); });
$('#open-cart').addEventListener('click', openCart); $('#close-cart').addEventListener('click', closeCart); $('#overlay').addEventListener('click', closeCart);
$('#checkout-button').addEventListener('click', () => { closeCart(); renderPayment(); $('#checkout-modal').hidden = false; });
$('#close-checkout').addEventListener('click', () => { $('#checkout-modal').hidden = true; openCart(); });
$('#checkout-modal').addEventListener('click', event => { if (event.target === $('#checkout-modal')) { $('#checkout-modal').hidden = true; openCart(); } });
$$('input[name="payment"]').forEach(input => input.addEventListener('change', renderPayment));
$('#pay-button').addEventListener('click', async () => {
  const button = $('#pay-button'); button.disabled = true;
  try { const response = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items: cart, payment: $('input[name="payment"]:checked').value, installments: Number($('#installments').value) }) }); const data = await response.json(); $('#payment-message').textContent = data.error || 'Não foi possível finalizar o pedido.'; }
  catch { $('#payment-message').textContent = 'Não foi possível conectar à loja. Tente novamente.'; }
  finally { button.disabled = false; }
});
document.addEventListener('keydown', event => { if (event.key === 'Escape') { if (!$('#checkout-modal').hidden) { $('#checkout-modal').hidden = true; openCart(); } else closeCart(); } });
Promise.all([fetch('/api/products').then(r => { if (!r.ok) throw Error(); return r.json(); }), fetch('/api/promotions').then(r => { if (!r.ok) throw Error(); return r.json(); })]).then(([loadedProducts, loadedPromotions]) => { products = loadedProducts; promotions = loadedPromotions; renderProducts(); renderSlide(); renderCart(); }).catch(() => { $('#product-grid').textContent = 'Não foi possível carregar os produtos. Atualize a página para tentar novamente.'; });
