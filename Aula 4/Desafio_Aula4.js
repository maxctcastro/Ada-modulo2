// A string do recibo de venda
let reciboDeVenda = 'régua/valor3=cupom0;lápis/valor0.5=cupom0;mochila/valor50=cupom10;estojo/valor8=cupom0;cola/valor4=cupom0;cola/valor4=cupom0;mochila/valor50=cupom10;lápis/valor0.5=cupom0;cola/valor4=cupom0;lápis/valor0.5=cupom0;mochila/valor50=cupom10;tesoura/valor5=cupom0;caneta/valor1=cupom0;cola/valor4=cupom0;estojo/valor8=cupom0;borracha/valor2=cupom0;caderno/valor15=cupom5;lápis/valor0.5=cupom0;lápis/valor0.5=cupom0;tesoura/valor5=cupom0;';

// A lista de vendas que será preenchida
let listaDaVenda = [];

// Os totais que serão calculados
let totais = {
    valorTotal: 0,
    valorTotalDesconto: 0,
    quantidadeDeProdutos: 0
};

// Divide a string do recibo em produtos individuais
let produtos = reciboDeVenda.split(';')

// Processa cada produto individualmente
produtos.forEach(produto => {
    // Divide o produto em nome e valor/cupom
    let [nome, valorCupom] = produto.split('/valor');

    // Se valorCupom não for undefined, processa o produto
    if (valorCupom) {
        // Divide valorCupom em valor e cupom
        let [valor, cupom] = valorCupom.split('=cupom');

        // Converte valor e cupom para os tipos corretos
        valor = parseFloat(valor);
        cupom = parseInt(cupom);

        // Formata o nome para ter a primeira letra maiúscula
        nome = nome.charAt(0).toUpperCase() + nome.slice(1);

        // Procura o produto na lista de vendas
        let item = listaDaVenda.find(item => item.produto === nome);

        // Se o produto já estiver na lista, incrementa a quantidade
        if (item) {
            item.quantidade++;
        } else {
            // Caso contrário, adiciona um novo item à lista
            listaDaVenda.push({
                produto: nome,
                valor: valor,
                cupom: cupom,
                quantidade: 1
            });
        }

        // Atualiza os totais
        totais.valorTotal += valor;
        totais.valorTotalDesconto += valor * (1 - cupom / 100);
        totais.quantidadeDeProdutos++;
    }
});
// Imprime a lista de vendas formatada e os totais
console.clear();
console.log(listaDaVenda);
console.log(totais);

// Este código faz o seguinte:

// Divide a string do recibo de venda em produtos individuais.
// Para cada produto, divide o nome do produto e o valor/cupom.
// Se o valor/cupom não for undefined, o produto é processado.
// Divide o valor/cupom em valor e cupom.
// Converte o valor e o cupom para os tipos corretos.
// Formata o nome do produto para ter a primeira letra maiúscula.
// Procura o produto na lista de vendas.
// Se o produto já estiver na lista, incrementa a quantidade.
// Caso contrário, adiciona um novo item à lista.
// Atualiza os totais.
// Imprime a lista de vendas formatada e os totais.