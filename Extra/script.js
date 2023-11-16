// Desafio 4: Jogo da Forca

// Descrição: Implemente o jogo da forca. O programa deve escolher aleatoriamente uma palavra e solicitar que o usuário tente adivinhar a palavra, fornecendo uma letra por vez. O usuário tem um número limitado de tentativas para adivinhar a palavra.

// Conjunto de palavras a serem sorteadas

let palavras = ["javascript", "programacao", "desenvolvimento", "computador", "web"];
        let palavraSorteada = palavras[Math.floor(Math.random() * palavras.length)];
        console.log(palavraSorteada);
        let letrasPalavra = palavraSorteada.split('');
        console.log(letrasPalavra);
        let letrasSorteadas = new Array(letrasPalavra.length);
        letrasSorteadas.fill('_');
        console.log(letrasSorteadas);
        let tentativasMaximas = 8;
        let tentativaRestante = tentativasMaximas;

        function exibirJogo() {
            document.getElementById('palavra').textContent = "Palavra: " + letrasSorteadas.join('');
            document.getElementById('tentativaRestante').textContent = "Tentativas Restantes: " + tentativaRestante;
        }

        function LetraInserida() {
            let letraInserida = prompt("Insira uma Letra:").toLowerCase();

            if (letrasSorteadas.includes(letraInserida)) {
                alert("Você já tentou essa letra. Tente outra.");
                return;
            }

            let letraEncontrada = false;
            for (let i = 0; i < letrasSorteadas.length; i++) {
                if (letrasPalavra[i] === letraInserida) {
                    letrasSorteadas[i] = letraInserida;
                    letraEncontrada = true;
                }
            }

            if (!letraEncontrada) {
                tentativaRestante--;
                alert("Letra não encontrada. Tente novamente.");
            }

            if (letrasSorteadas.join('') === palavraSorteada) {
                alert("Parabéns! Você adivinhou a palavra: " + palavraSorteada);
                resetarJogo();
            }

            if (tentativaRestante === 0) {
                alert("Game Over! A palavra era: " + palavraSorteada);
                resetarJogo();
            }
            exibirJogo();
        }

        function resetarJogo() {
            palavraSorteada = palavras[Math.floor(Math.random() * palavras.length)];
            letrasPalavra = palavraSorteada.split('');
            letrasSorteadas = new Array(letrasPalavra.length).fill('_');
            tentativaRestante = tentativasMaximas;
            exibirJogo();
        }

        exibirJogo();