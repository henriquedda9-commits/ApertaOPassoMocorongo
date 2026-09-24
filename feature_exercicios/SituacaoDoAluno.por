programa
{
	funcao inicio()
	{
		real media

		escreva("Digite a média: ")
		leia(media)

		se (media < 5)
		{
			escreva("Reprovado")
		}
		senao se (media < 7)
		{
			escreva("Recuperação")
		}
		senao
		{
			escreva("Aprovado")
		}
	}
}