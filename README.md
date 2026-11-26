<!-- coderabbit-ai-generated:v1 -->

# Arquibancada

Loja demonstrativa de produtos de futebol, com catálogo, filtros, carrossel de promoções e carrinho salvo no navegador.

## Executar

Requer Node.js 18 ou superior. Execute `npm start` e acesse http://localhost:3000. Para os testes da API, execute `npm test`.

## API

- `GET /api/products`: catálogo de produtos.
- `GET /api/promotions`: conteúdo do carrossel.
- `POST /api/checkout`: retorna 503 enquanto não houver um provedor de pagamento configurado.

## Pagamentos

O checkout é uma demonstração de escolha de Pix com 5% de desconto e cartão de crédito em até seis parcelas. Ele **não cria pedidos nem processa cobranças**. Para vender de verdade, é preciso integrar um provedor de pagamento, calcular e validar valores no servidor, cadastrar produtos e estoque reais e implementar o fluxo de pedidos e entrega. Nunca envie dados de cartão ao servidor desta demonstração.

As imagens dos produtos são ilustrações; o catálogo e os preços são exemplos.
