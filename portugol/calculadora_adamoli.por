programa
{
    funcao inicio()
    {
    
        real cotacao, reais, dolar

        cotacao = 5.16

        escreva("=== CONVERSOR DE DOLAR ===\n")
        escreva("Digite um valor inteiro em dolar: ")
        leia(dolar)

        reais = dolar * cotacao

        escreva("\nUS$ ", dolar)
        escreva(" equivalem a R$ " , reais)
    }
}