programa
{
	funcao inicio()
	{
		inteiro opcao
		real media
		inteiro ausencias

		faca
		{
			escreva("\n===== SECRETARIA ACADEMICA =====\n")
			escreva("1 - Classificar media do candidato\n")
			escreva("2 - Classificar horas de ausencia\n")
			escreva("0 - Sair\n")
			escreva("Escolha uma opcao: ")
			leia(opcao)

			se (opcao == 1)
			{
				escreva("Digite a media: ")
				leia(media)

				se (media < 0 ou media > 10)
				{
					escreva("INVALIDA\n")
				}
				senao se (media < 5)
				{
					escreva("INSUFICIENTE\n")
				}
				senao se (media < 7)
				{
					escreva("RECUPERACAO\n")
				}
				senao
				{
					escreva("APTA\n")
				}
			}
			senao se (opcao == 2)
			{
				escreva("Digite as horas de ausencia: ")
				leia(ausencias)

				se (ausencias < 0)
				{
					escreva("INVALIDA\n")
				}
				senao se (ausencias == 0)
				{
					escreva("FREQUENCIA_TOTAL\n")
				}
				senao se (ausencias <= 8)
				{
					escreva("ATENCAO\n")
				}
				senao
				{
					escreva("RISCO_REPROVACAO\n")
				}
			}
			senao se (opcao == 0)
			{
				escreva("Programa encerrado.\n")
			}
			senao
			{
				escreva("opcao inexistente\n")
			}

		} enquanto (opcao != 0)
	}
}