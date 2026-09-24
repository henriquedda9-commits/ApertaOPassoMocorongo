programa
{
	funcao inicio()
	{
		cadeia nome
		inteiro matricula
		real nota
		caracter sala
		logico curso

		escreva("Nome: ")
		leia(nome)

		escreva("Matrícula: ")
		leia(matricula)

		escreva("Nota da entrevista: ")
		leia(nota)

		escreva("Sala: ")
		leia(sala)

		escreva("Já fez curso no SENAI? (verdadeiro/falso): ")
		leia(curso)

		escreva("\n===== CRACHÁ =====\n")
		escreva("Nome: ", nome, "\n")
		escreva("Matrícula: ", matricula, "\n")
		escreva("Nota da entrevista: ", nota, "\n")
		escreva("Sala: ", sala, "\n")
		escreva("Já fez curso no SENAI: ", curso, "\n")
	}
}