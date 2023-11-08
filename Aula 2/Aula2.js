
function calcularMedia(){

const VotoPorEstrela = [2, 15, 15, 25, 40];

let soma = 0;

for (let i = 0; i < VotoPorEstrela.length; i++) {
    soma += (i + 1) * VotoPorEstrela[i];
}

const totalVotos = VotoPorEstrela.reduce(function(total, votos) {
    return total + votos;
}, 0);

const media = soma / totalVotos;

console.log("Soma dos pontos:", soma);
console.log("Média das avaliações:", media);
document.getElementById("resultado").innerHTML = "Média das Avaliações: "  + media.toFixed(2) + "☆";
}