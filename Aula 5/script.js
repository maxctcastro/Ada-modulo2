function CalcularIMC() {
    
    try {
        const nome = document.getElementById('nome').value;
        if (!isNaN(nome)) {
            throw new Error("Nome inválido");
        }
        const peso = parseFloat(document.getElementById('peso').value);
        if (isNaN(peso) || peso === null) {
            throw new Error("Peso Inválido")
        }
        if (peso === 0) {
            throw new Error("Peso Zerado")
        }

        const altura = parseFloat(document.getElementById('altura').value);
        if (isNaN(altura) || altura === null) {
            throw new Error("Altura Inválida")
        }
        if (altura === 0) {
            throw new Error("Altura Zerada")
        }

        const IMC = peso / (altura ** 2);
        let res = document.getElementById('resultado')
        res.innerHTML = `Olá <strong>${nome}</strong>! Seu IMC é: <strong>` + IMC.toFixed(2) + "</strong>";

        // Com base no resultado, informe ao usuário em qual faixa de IMC ele se encontra.
        if (IMC < 18.5) {
            console.log("Você está abaixo do peso.");
            res.innerHTML += "<p>Você está <strong>Abaixo do peso</strong></p>"
        } else if (IMC < 24.9) {
            console.log("Você está no peso normal.");
            res.innerHTML += "<p>Você está no <strong>Peso normal</strong></p>"
        } else if (IMC < 30) {
            console.log("Você está com sobrepeso.");
            res.innerHTML += "<p>Você está com <strong>Sobrepeso</strong></p>"
        } else if (IMC >= 30) {
            console.log("Você está com obesidade.");
            res.innerHTML += "<p>Você está com <strong>Obesidade</strong></p>"
        } else {
            console.log("Informe Valores Válidos")
            res.innerHTML += "<p>Informe Valores Válidos</p>"
        }
    } catch (error) {

        console.log(error.message)
        alert("Erro: " + error.message)
    }
}