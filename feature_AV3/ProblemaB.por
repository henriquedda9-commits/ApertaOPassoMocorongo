programa
{
	// Função 1: Calcula a média dos elementos do vetor
	funcao real media(real &vetor[], inteiro n)
	{
		real soma = 0.0
		para (inteiro i = 0; i < n; i = i + 1)
		{
			soma = soma + vetor[i]
		}
		retorne soma / n
	}

	// Função 2: Conta quantos elementos são estritamente menores que a média
	funcao inteiro abaixoDaMedia(real &vetor[], inteiro n, real m)
	{
		inteiro qtd = 0
		para (inteiro i = 0; i < n; i = i + 1)
		{
			se (vetor[i] < m)
			{
				qtd = qtd + 1
			}
		}
		retorne qtd
	}

	// Função 3: Procura o elemento alvo e devolve o seu índice (ou -1 se não encontrar)
	funcao inteiro buscar(real &vetor[], inteiro n, real alvo)
	{
		para (inteiro i = 0; i < n; i = i + 1)
		{
			se (vetor[i] == alvo)
			{
				retorne i
			}
		}
		retorne -1
	}

	// Programa Principal
	funcao inicio()
	{
		const inteiro N = 8
		real consumo[N]
		real alvo

		// 1. Leitura dos 8 valores do vetor de consumo
		escreva("--- Leitura do Consumo (8 semanas) ---\n")
		para (inteiro i = 0; i < N; i = i + 1)
		{
			escreva("Informe o consumo da semana ", i + 1, ": ")
			leia(consumo[i])
		}

		// 2. Leitura do valor alvo para a busca
		escreva("\nInforme o consumo a procurar (alvo): ")
		leia(alvo)

		// 3. Chamada das funções
		real m = media(consumo, N)
		inteiro qtdAbaixo = abaixoDaMedia(consumo, N, m)
		inteiro indice = buscar(consumo, N, alvo)

		// 4. Exibição dos resultados
		escreva("\n--- Resultados ---\n")
		escreva("Média: ", m, "\n")
		escreva("Quantidade abaixo da média: ", qtdAbaixo, "\n")
		escreva("Índice da busca: ", indice, "\n")
	}
}