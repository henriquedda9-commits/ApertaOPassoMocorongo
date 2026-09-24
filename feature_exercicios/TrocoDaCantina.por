programa
{
	funcao inicio()
	{
		real preco
		real pago
		real troco

		escreva("Preço do lanche: ")
		leia(preco)

		escreva("Valor pago: ")
		leia(pago)

		se (pago < preco)
		{
			escreva("Valor insuficiente")
		}
		senao
		{
			troco = pago - preco
			escreva("Troco: R$ ", troco)
		}
	}
}