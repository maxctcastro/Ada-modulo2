function Inicio(){
    let peso = Number(prompt("Informe seu Peso: "));
    let altura = Number(prompt("Informe sua Altura:"));
    
    let IMC = peso / (altura * altura);
    let res = document.getElementById('resultado')
    res.innerHTML = "Seu IMC é: <strong>" + IMC.toFixed(2) + "</strong>"; 

// Com base no resultado, informe ao usuário em qual faixa de IMC ele se encontra.
if (IMC < 18.5) {
    console.log("Você está abaixo do peso.");
    res.innerHTML += "<p>Você está abaixo do peso </p>"
} else if (IMC >= 18.5 && IMC < 25) {
    console.log("Você está no peso normal.");
    res.innerHTML += "<p>Você está no peso normal</p>"
} else if (IMC >= 25 && IMC < 30) {
    console.log("Você está com sobrepeso.");
    res.innerHTML += "<p>Você está com sobrepeso</p>"
} else if (IMC >= 30) {
    console.log("Você está com obesidade.");
    res.innerHTML += "<p>Você está com obesidade</p>"
} else {
    console.log("Informe Valores Validos")
    res.innerHTML += "<p>Informe Valores Validos</p>"
}
}