programa
{
    funcao cadeia faixa(inteiro idade)
    {
        se (idade < 12)
        {
            retorne "crianca"
        }
        senao se (idade < 18)
        {
            retorne "adolescente"
        }
        senao se (idade < 60)
        {
            retorne "adulto"
        }
        senao
        {
            retorne "idoso"
        }
    }

    funcao inicio()
    {
        inteiro idade
        cadeia resultado

        escreva("Digite sua idade: ")
        leia(idade)

        resultado = faixa(idade)

        escreva("Faixa etária: ", resultado)
    }
}