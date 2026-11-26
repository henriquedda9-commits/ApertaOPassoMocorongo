const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const products = [
  { id: 'bra-1', name: 'Camisa Brasil Torcedor I', team: 'Brasil', category: 'Camisas', price: 189.90, oldPrice: 249.90, tag: 'MAIS VENDIDO', colors: ['#f4ce22','#137449'], style: 'solid', flag: '🇧🇷' },
  { id: 'arg-1', name: 'Camisa Argentina Torcedor I', team: 'Argentina', category: 'Camisas', price: 199.90, oldPrice: 259.90, tag: 'OFERTA', colors: ['#edf3f2','#79b6d1'], style: 'stripes', flag: '🇦🇷' },
  { id: 'fra-1', name: 'Camisa França Torcedor I', team: 'França', category: 'Camisas', price: 189.90, oldPrice: 239.90, tag: 'DESTAQUE', colors: ['#192c54','#e94446'], style: 'solid', flag: '🇫🇷' },
  { id: 'por-1', name: 'Camisa Portugal Torcedor I', team: 'Portugal', category: 'Camisas', price: 179.90, oldPrice: 229.90, tag: 'OFERTA', colors: ['#a82231','#195b45'], style: 'solid', flag: '🇵🇹' },
  { id: 'ger-1', name: 'Camisa Alemanha Torcedor I', team: 'Alemanha', category: 'Camisas', price: 189.90, oldPrice: 239.90, tag: 'NOVIDADE', colors: ['#e9e9e3','#252525'], style: 'solid', flag: '🇩🇪' },
  { id: 'ita-1', name: 'Camisa Itália Torcedor I', team: 'Itália', category: 'Camisas', price: 179.90, oldPrice: 229.90, tag: 'NOVIDADE', colors: ['#2356a7','#e9e9e3'], style: 'solid', flag: '🇮🇹' },
  { id: 'bra-2', name: 'Cachecol Brasil Torcedor', team: 'Brasil', category: 'Acessórios', price: 79.90, oldPrice: 99.90, tag: 'OFERTA', colors: ['#f4ce22','#137449'], style: 'scarf', flag: '🇧🇷' },
  { id: 'arg-2', name: 'Bola Argentina Torcedor', team: 'Argentina', category: 'Acessórios', price: 119.90, oldPrice: 149.90, tag: 'DESTAQUE', colors: ['#edf3f2','#79b6d1'], style: 'ball', flag: '🇦🇷' }
];
const promotions = [
  { eyebrow: 'O MUNDO TODO EM CAMPO', title: 'Vista sua paixão.<br>Torça sem fronteiras.', description: 'As cores que movem multidões estão aqui. Encontre sua seleção e entre em campo com a gente.', button: 'EXPLORAR COLEÇÃO', filter: 'Todos' },
  { eyebrow: 'OFERTA DE CRAQUE', title: 'Sua torcida merece<br>esse uniforme.', description: 'Camisas de seleções para levar sua paixão para todos os lugares.', button: 'VER CAMISAS', filter: 'Camisas' },
  { eyebrow: 'COMPLETE A TORCIDA', title: 'O futebol está<br>nos detalhes.', description: 'Acessórios para demonstrar suas cores dentro e fora de campo.', button: 'VER ACESSÓRIOS', filter: 'Acessórios' }
];
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml' };
const publicDir = path.join(__dirname, 'public');
const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const json = (status, data) => { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(data)); };
  if (url.pathname === '/api/products' && req.method === 'GET') return json(200, products);
  if (url.pathname === '/api/promotions' && req.method === 'GET') return json(200, promotions);
  if (url.pathname === '/api/checkout' && req.method === 'POST') {
    // Payment credentials and a payment provider are intentionally required before accepting orders.
    return json(503, { error: 'Pagamento indisponível. A loja ainda precisa conectar um provedor de pagamento.' });
  }
  if (url.pathname.startsWith('/api/')) return json(404, { error: 'Rota não encontrada.' });
  if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405); return res.end(); }
  let pathname;
  try { pathname = decodeURIComponent(url.pathname); } catch { res.writeHead(400); return res.end(); }
  const file = path.resolve(publicDir, '.' + (pathname === '/' ? '/index.html' : pathname));
  if (!file.startsWith(publicDir + path.sep)) { res.writeHead(403); return res.end(); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Não encontrado'); }
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
    res.end(req.method === 'HEAD' ? undefined : data);
  });
});
if (require.main === module) server.listen(process.env.PORT || 3000, '0.0.0.0', () => console.log(`Loja disponível na porta ${process.env.PORT || 3000}`));
module.exports = server;
