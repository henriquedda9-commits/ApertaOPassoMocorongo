programa{

    funcao inicio(){
    caracter opcao
    real valor


    escreva("A - café\n")
    escreva("B - suco\n")
     escreva("C - pão\n")
      escreva("opção\n")
        leia(opcao)
        
        se(opcao == 'A' ou opcao == 'a'){
            valor = 6.00

        }senao se(opcao == 'B' ou opcao == 'b'){
            valor = 8.50
        }
        senao se(opcao == 'C' ou opcao == 'c'){
                valor = 7.50
        } senao{
            valor = 0.0
            escreva("opção invalida")
        }
        escreva("preço: R$",valor)
        
    }
    }
