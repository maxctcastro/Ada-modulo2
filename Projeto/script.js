let tarefas = []

let contadorid = 0

// Função para gerar id com contador
function gerarid() {
  return ++contadorid
}

// Função para adicionar uma tarefa

function adicionarTarefa() {
  try {
    const titulo = document.getElementById('titulo').value;

    // Verifica se há titulo vazio ou titulo com ate 4 caracteres

    if (titulo === "" || titulo.length < 4) {
      alert("Por favor, insira um título válido e com pelo menos 4 caracteres.");
      return // Para o codigo e não executa o resto, caso essa condição não seja atendida
    }

    // Verifica se há tarefas com o mesmo título

    if (tarefas.some(tarefa => tarefa.titulo === titulo)) {
      alert("Não deve haver tarefas com o título duplicado.");
      return;
    }

    if (!isNaN(titulo)) {
      alert("O título não pode conter apenas números.");
      return
    }

    const descricao = document.getElementById('descrição').value;

    if (descricao === "" || descricao.length < 20) {
      alert("Por favor, insira uma descrição válida com pelo menos 20 caracteres.");
      return
    }

    const categoria = document.getElementById('categoria').value;

    if (categoria !== "" && categoria.length < 5) {
      alert("Por favor, insira uma categoria com pelo menos 5 caracteres.");
      return
    }
    const vencimento = document.getElementById('vencimento').value;

    // Obtém a data atual

    const dataAtual = new Date();

    // Converte a string de vencimento para um objeto Date
    const dataVencimento = new Date(vencimento);

    // Verifica se a data de vencimento é no futuro
    if (dataVencimento.getTime() <= dataAtual.getTime()) {
      alert("Por favor, insira uma data de vencimento válida no futuro.");
      return;
    }
    const id = gerarid()

    const tarefa = {
      id: id,
      titulo: titulo,
      descricao: descricao,
      categoria: categoria,
      vencimento: vencimento,
      vencida: false,
      removido: false
    };

    tarefas.push(tarefa);

    document.getElementById('titulo').value = '';
    document.getElementById('descrição').value = '';
    document.getElementById('categoria').value = '';
    document.getElementById('vencimento').value = '';

    atualizarStatusVencimento();
    atualizarTotais();

    atualizaLista();

  } catch (error) {
    console.error(error);
    alert("Erro: " + error);
  }
}

// Função para atualizar a lista de tarefas

function atualizaLista() {


  const lista = document.getElementById("lista");


  lista.innerHTML = '';


  tarefas.forEach(tarefa => {

    const li = document.createElement("li");


    // Criar parágrafos para exibir informações da tarefa

    const idPara = document.createElement("p")
    idPara.textContent = `Id: ${tarefa.id}`
    li.appendChild(idPara)
    const tituloPara = document.createElement("p");
    tituloPara.textContent = `Título: ${tarefa.titulo}`;
    li.appendChild(tituloPara);

    const categoriaPara = document.createElement("p");
    categoriaPara.textContent = `Categoria: ${tarefa.categoria}`;
    li.appendChild(categoriaPara);

    const descricaoPara = document.createElement("p");
    descricaoPara.textContent = `Descrição: ${tarefa.descricao}`;
    li.appendChild(descricaoPara);

    const vencimentoPara = document.createElement("p");
    if (tarefa.vencimento && tarefa.vencimento.trim() !== "") {
      const dataVencimento = new Date(tarefa.vencimento);
      // Verifica se a dataVencimento é um valor válido
      if (!isNaN(dataVencimento.getTime())) {
        const dataFormatada = `${dataVencimento.getDate() + 1}/${dataVencimento.getMonth() + 1}/${dataVencimento.getFullYear()}`;
        vencimentoPara.textContent = `Vencimento: ${dataFormatada}`;
      } else {
        vencimentoPara.textContent = "Vencimento: Data inválida";
      }
    } else {
      vencimentoPara.textContent = "Vencimento: ";
    }
    li.appendChild(vencimentoPara);

    const vencidoPara = document.createElement("p");
    vencidoPara.textContent = `Vencida: ${tarefa.vencida ? 'Sim' : 'Não'}`;
    li.appendChild(vencidoPara);

    // Adicionar botão "Editar" a cada tarefa li criada
    const botaoEditar = document.createElement("button");
    botaoEditar.textContent = "Editar Tarefa";
    botaoEditar.addEventListener("click", () => editarTarefa(tarefa.id));
    li.appendChild(botaoEditar);

    // Adicionar botão "Remover" a cada tarefa li criada
    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "Remover Tarefa";
    botaoRemover.addEventListener("click", () => removerTarefa(tarefa.id));
    li.appendChild(botaoRemover);

    // Adicionar botão "Recuperar" a cada tarefa li criada

    const botaoRecuperar = document.createElement("button");
    botaoRecuperar.textContent = "Recuperar Tarefa";
    botaoRecuperar.addEventListener("click", () => recuperarTarefaRemovida(tarefa.id));
    li.appendChild(botaoRecuperar);

    if (tarefa.removido) {
      li.classList.add('tarefa-removida');
    }
    // Adicionar a tarfea li criado a lista de tarefas"
    lista.appendChild(li);
  });
}

// Função para editar uma tarefa

function editarTarefa(tarefaId) {

  const tarefa = tarefas.find(t => t.id === tarefaId);
  // cria uma cópia rasa dessa tarefa, armazenando-a na variável tarefaEditada
  tarefaEditada = { ...tarefa };

  document.getElementById("titulo").value = tarefa.titulo;
  document.getElementById("descrição").value = tarefa.descricao;
  document.getElementById("categoria").value = tarefa.categoria;
  document.getElementById("vencimento").value = tarefa.vencimento;

  // Atualiza o ID da tarefaEditada para que seja passado para salvarEdicao
  tarefaEditada.id = tarefaId;

  atualizaLista();
  atualizarTotais();
}

// Função para salvar edição

function salvarEdicao() {
  if (!tarefaEditada) {
    console.error("Nenhuma tarefa editada encontrada.");
    return;
  }

  const index = tarefas.findIndex(t => t.id === tarefaEditada.id);

  tarefas[index].titulo = document.getElementById("titulo").value;
  tarefas[index].descricao = document.getElementById("descrição").value;
  tarefas[index].categoria = document.getElementById("categoria").value;
  tarefas[index].vencimento = document.getElementById("vencimento").value;

  tarefaEditada = null;

  document.getElementById('titulo').value = '';
  document.getElementById('descrição').value = '';
  document.getElementById('categoria').value = '';
  document.getElementById('vencimento').value = '';
  atualizaLista();
  atualizarTotais();
}

// Função Remover Tarefa

function removerTarefa(tarefaId) {
  // Encontra a tarefa pelo ID
  const tarefa = tarefas.find(tarefa => tarefa.id === tarefaId);
  if (tarefa) {
    tarefa.removido = true; // Marca a tarefa como removida
    alert(`Tarefa removida:\nID: ${tarefa.id}\nTítulo: ${tarefa.titulo}\nDescrição: ${tarefa.descricao}\nVencimento: ${tarefa.vencimento}`)
  } else {
    alert('Nenhuma tarefa encontrada com o ID fornecido.')
  }

  atualizaLista()
  atualizarTotais();
}

// Função para listar as tarefas removidas

function listarTarefasRemovidas() {
  const tarefasRemovidas = tarefas.filter(tarefa => tarefa.removido);

  if (tarefasRemovidas.length > 0) {
    // Criar uma mensagem com as informações das tarefas removidas
    const mensagem = tarefasRemovidas.map(tarefa =>
      `ID: ${tarefa.id}\nTítulo: ${tarefa.titulo}\nDescrição: ${tarefa.descricao}\nVencimento: ${tarefa.vencimento}`
    ).join('\n\n'); // Une as mensagens com duas quebras de linha

    alert(`Tarefas Removidas:\n\n${mensagem}`);
  } else {
    alert("Nenhuma tarefa removida.");
  }
}

// Função para recuperar uma tarefa removida (id)

function recuperarTarefaRemovida(tarefaId) {
  try {
    // Encontrar a tarefa removida no array de tarefas
    const tarefaRemovida = tarefas.find(tarefa => tarefa.id === tarefaId && tarefa.removido);

    if (tarefaRemovida) {
      // Alterar o estado removido da tarefa para false para sair do status removida
      tarefaRemovida.removido = false;

      // Exibir uma mensagem ou fazer algo com a tarefa recuperada (por exemplo, mostrar um alert)
      alert(`Tarefa recuperada:\nID: ${tarefaRemovida.id}\nTítulo: ${tarefaRemovida.titulo}\nDescrição: ${tarefaRemovida.descricao}\nVencimento: ${tarefaRemovida.vencimento}`);

      // Atualizar a lista na interface do usuário
      atualizaLista();

      // Atualizar totais, se necessário
      atualizarTotais();
    } else {
      alert('Nenhuma tarefa removida encontrada com o ID fornecido ou a tarefa não está marcada como removida.');
    }
  } catch (error) {
    console.error(error);
    alert('Erro: ' + error.message);
  }
}

// Função para obter tarefa por Id

function obterTarefa() {
  try {
    const idTarefa = document.getElementById('idTarefa').value;
    const idTarefaNumero = parseInt(idTarefa, 10);

    if (!isNaN(idTarefaNumero)) {
      const tarefaEncontrada = tarefas.find(tarefa => tarefa.id === idTarefaNumero);

      if (tarefaEncontrada) {
        alert(`Tarefa encontrada:\nID: ${tarefaEncontrada.id}\nTítulo: ${tarefaEncontrada.titulo}\nDescrição: ${tarefaEncontrada.descricao}\nVencimento: ${tarefaEncontrada.vencimento}`);
      } else {
        alert("Tarefa não encontrada.");
      }
    } else {
      alert("Por favor, insira um ID de tarefa válido.");
    }
  } catch (error) {
    console.error(error);
    alert("Erro: " + error);
  }
}
// Função para listar as tarefas por categoria

function listarTarefasPorCategoria() {
  try {
    // Obtém a categoria inserida pelo usuário
    const categoriaDesejada = document.getElementById('categoriaDesejada').value;

    // Verifica se a categoria não está vazia
    if (categoriaDesejada === "") {
      alert("Por favor, insira uma categoria válida.");
      return;
    }

    // Filtra as tarefas com base na categoria
    const tarefasPorCategoria = tarefas.filter(tarefa => tarefa.categoria === categoriaDesejada);

    // Verifica se há tarefas na categoria
    if (tarefasPorCategoria.length > 0) {
      // Cria uma mensagem com as tarefas da categoria
      const mensagem = tarefasPorCategoria.map(tarefa =>
        `ID: ${tarefa.id}\nTítulo: ${tarefa.titulo}\nDescrição: ${tarefa.descricao}\nVencimento: ${tarefa.vencimento}`
      ).join('\n\n'); // Une as mensagens com duas quebras de linha

      alert(`Tarefas na categoria "${categoriaDesejada}":\n\n${mensagem}`);
    } else {
      alert(`Não há tarefas na categoria "${categoriaDesejada}".`);
    }
  } catch (error) {
    console.error(error);
    alert("Erro: " + error);
  }
}

// Função para filtrar as tarefas em vencidas ou não vencidas de acordo com o parâmetro status.
function filtrarTarefas(status) {
  const dataAtual = new Date();

  if (status === 'vencidas') {
    return tarefas.filter(tarefa => tarefa.vencida || new Date(tarefa.vencimento) < dataAtual);
  } else if (status === 'naoVencidas') {
    return tarefas.filter(tarefa => !tarefa.vencida && new Date(tarefa.vencimento) >= dataAtual);
  } else {
    return tarefas;
  }
}
// Função para mostrar tarefas vencidas ou não vencidas

function mostrarTarefas(status) {
  const listaFiltrada = filtrarTarefas(status);
  const mensagem = listaFiltrada.map(tarefa =>
    `ID: ${tarefa.id}\nTítulo: ${tarefa.titulo}\nDescrição: ${tarefa.descricao}\nVencimento: ${tarefa.vencimento}`
  ).join('\n\n');

  alert(`Tarefas ${status === 'vencidas' ? 'Vencidas' : 'Não Vencidas'}:\n\n${mensagem}`); //Se o status for igual a 'vencidas', a string resultante será 'Vencidas'.  Se o status não for igual a 'vencidas', a string resultante será 'Não Vencidas'.  \n\n:  Adiciona duas quebras de linha para separar o título da mensagem do restante do conteúdo.  ${mensagem}:

}

// Função para atualizar o status de vencimento

function atualizarStatusVencimento() {
  const dataAtual = new Date();


  tarefas.forEach(tarefa => {
    // Considere vencida se a data atual for maior que a data de vencimento
    tarefa.vencida = dataAtual > new Date(tarefa.vencimento);
  });
}
let totais = {
  QuantidadeDeTarefasNaAplicacao: 0,
  QuantidadeDeTarefasSemCategoria: 0,
  QuantidadedeTarefasPorCategoria: {},
  QuantidadeDeTarefasSemVencimento: 0,
  QuantidadeDeTarefasVencidas: 0,
  QuantidadeDeTarefasNoPrazo: 0

}

// Atuailiza os totais

function atualizarTotais() {
  totais.QuantidadeDeTarefasNaAplicacao = tarefas.length;
  totais.QuantidadeDeTarefasSemCategoria = tarefas.filter(tarefa => tarefa.categoria === "").length;
  totais.QuantidadedeTarefasPorCategoria = contarTarefasPorCategoria();
  totais.QuantidadeDeTarefasSemVencimento = tarefas.filter(tarefa => tarefa.vencimento === "").length;
  totais.QuantidadeDeTarefasVencidas = tarefas.filter(tarefa => tarefa.vencida).length;
  totais.QuantidadeDeTarefasNoPrazo = tarefas.filter(tarefa => !tarefa.vencida).length;
}
// Função para contar as tarefas por categoria 

function contarTarefasPorCategoria() {
  const categorias = {};

  tarefas.forEach(tarefa => {
    const categoria = tarefa.categoria || "Sem Categoria";
    categorias[categoria] = (categorias[categoria] || 0) + 1;
  });

  return categorias;
}
// Função para exibir os totais
function exibirTotais() {
  let mensagem =
    "Totais:\n" +
    `Quantidade de Tarefas na Aplicação: ${totais.QuantidadeDeTarefasNaAplicacao}\n` +
    `Quantidade de Tarefas Sem Categoria: ${totais.QuantidadeDeTarefasSemCategoria}\n` +
    `Quantidade de Tarefas Sem Vencimento: ${totais.QuantidadeDeTarefasSemVencimento}\n` +
    `Quantidade de Tarefas Vencidas: ${totais.QuantidadeDeTarefasVencidas}\n` +
    `Quantidade de Tarefas no Prazo: ${totais.QuantidadeDeTarefasNoPrazo}\n`;

  mensagem += "\nQuantidade de Tarefas por Categoria:\n";

  for (const categoria in totais.QuantidadedeTarefasPorCategoria) {
    const totalPorCategoria = totais.QuantidadedeTarefasPorCategoria[categoria];
    mensagem += `${categoria}: ${totalPorCategoria}\n`;
  }

  alert(mensagem);
}