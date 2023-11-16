function CalcularIMC(){
    const nome = document.getElementById('nome').value;
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);
    
    let IMC = peso / (altura * altura);
    let res = document.getElementById('resultado')
    res.innerHTML = `Olá <strong>${nome}</strong>! Seu IMC é: <strong>` + IMC.toFixed(2) + "</strong>"; 

// Com base no resultado, informe ao usuário em qual faixa de IMC ele se encontra.
if (IMC < 18.5) {
    console.log("Você está abaixo do peso.");
    res.innerHTML += "<p>Você está <strong>Abaixo do peso</strong></p>"
} else if (IMC >= 18.5 && IMC < 25) {
    console.log("Você está no peso normal.");
    res.innerHTML += "<p>Você está no <strong>Peso normal</strong></p>"
} else if (IMC >= 25 && IMC < 30) {
    console.log("Você está com sobrepeso.");
    res.innerHTML += "<p>Você está com <strong>Sobrepeso</strong></p>"
} else if (IMC >= 30) {
    console.log("Você está com obesidade.");
    res.innerHTML += "<p>Você está com <strong>Obesidade</strong></p>"
} else {
    console.log("Informe Valores Validos")
    res.innerHTML += "<p>Informe Valores Validos</p>"
}
}