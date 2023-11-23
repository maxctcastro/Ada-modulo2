# Lógica de Programação - Projeto final

## Descrição do desafio
    
### O que?
    
Desenvolver, utilizando os conceitos abordados ao longo do módulo, uma aplicação de lista de tarefas (ToDo List). 
    
### Requisitos

Dentre as funcionalidades, espera-se que seja possível:

- Adicionar uma tarefa (id, titulo e descrição)
- Editar uma tarefa salva (titulo e descrição)
- Remover uma tarefa salva
- Listar todas as tarefas salvas
- Obter uma tarefa, através de um parâmetro (id)
 ---
### Validações

- A tarefa não pode ter titulo e descrição vazios.
- O título não deve conter apenas números
- O titulo deve ter no mínimo 4 caracteres.
- A descrição deve ter no mínimo 20 caracteres.
- Não deve haver tarefas com o título duplicado.

### Observações
    
Não haverá a persistência das tarefas em banco de dados. Para isso, podem utilizar um `array` para armazenar a lista das tarefas cadastradas.

## Extra 1

Adicionar a lógica de categoria nas tarefas, com isso as funcionalidades e campos mudam para:

- Adicionar uma tarefa (id, titulo, descrição e categoria)
- Editar uma tarefa salva (titulo, descrição e categoria)
- Listar tarefas de uma categoria em especifico
- Categoria é um campo opcional

### Todas a validações anteriores +
- Categoria deve ter no mínimo 5 caracteres

## Extra 2

Adicionar a lógica de vencimento nas tarefas, com isso as funcionalidades e campos mudam para:

- Adicionar uma tarefa (id, titulo, descrição, categoria e vencimento)
- Editar uma tarefa salva (titulo, descrição, categoria e vencimento)
- Listar tarefas com um campo booleano (vencido) para mostrar se a tarefa está ou não vencida
- Listar tarefas vencidas
- Listar tarefas não vencidas

### Todas a validações anteriores +
- Campo vencimento não pode ser menor que a data de hoje (momento do cadastro/edição)

## Extra 3

Adicionar totalizadores (uma função que retorna as seguintes informações)

- Quantidade de tarefas na aplicação
- Quantidade de tarefas sem categoria
- Quantidade de tarefas por categoria
- Quantidade de tarefas sem vencimento
- Quantidade de tarefas vencidas
- Quantidade de tarefas no prazo

## Extra 4

Adicionar lógica `soft delete` com isso as funcionalidades e campos mudam para:

- Adicionar uma tarefa (id, titulo, descrição, categoria, vencimento, removido)
- Listar tarefas removidas
- Recuperar tarefa removida

### Todas a validações anteriores +
- Campo removido deve ser padrão `false`, ao remover uma tarefa esse campo é alterado, assim não sendo mais listado apenas na funcionalidade especifica de listagem de tarefas removidas


##  Uma breve explicação das principais partes do código:

### Função adicionarTarefa:
- Obtém os valores dos campos de título, descrição, categoria e vencimento do formulário.
- Realiza várias verificações de validação, como garantir que o título não esteja vazio, tenha mais de 4 caracteres,não seja apenas um número, a descrição tenha pelo menos 20 caracteres, etc.
- Converte a string de vencimento em um objeto Date.
- Verifica se a data de vencimento é no futuro.
- Gera um ID usando a função gerarid.
- Cria um objeto de tarefa com as informações fornecidas.
- Adiciona a tarefa ao array tarefas.
- Limpa os campos do formulário.
- Chama funções para atualizar o status de vencimento, totais e a lista de tarefas.

### Função atualizaLista:
- Limpa o conteúdo da lista de tarefas no HTML.
- Itera sobre todas as tarefas no array tarefas.
- Para cada tarefa, cria um elemento li e adiciona parágrafos para ID, título, categoria, descrição, vencimento e se a tarefa é vencida.
- Adiciona botões para editar, remover e recuperar tarefas.
- Adiciona a classe 'tarefa-removida' se a tarefa estiver marcada como removida.
- Adiciona cada elemento li à lista no HTML.

### Função editarTarefa:
- Encontra a tarefa correspondente pelo ID.
- Cria uma cópia rasa dessa tarefa e a armazena na variável tarefaEditada.
- Preenche os campos do formulário com as informações da tarefa para edição.
- Atualiza o ID da tarefaEditada para que seja passado para a função salvarEdicao.
- Chama funções para atualizar a lista de tarefas e os totais.

### Função salvarEdicao:
- Verifica se há uma tarefa editada.
- Encontra a posição da tarefa editada no array tarefas.
- Atualiza as informações da tarefa no array com os valores dos campos do formulário.
- Limpa os campos do formulário.
- Chama funções para atualizar a lista de tarefas e os totais.

### Função removerTarefa:
- Encontra a tarefa pelo ID.
- Marca a tarefa como removida.
- Exibe uma mensagem com informações sobre a tarefa removida.
- Chama funções para atualizar a lista de tarefas e os totais.

### Função recuperarTarefaRemovida:
- Encontra a tarefa removida no array tarefas.
- Altera o estado removido da tarefa para false para desmarcá-la como removida.
- Exibe uma mensagem ou realiza ações adicionais.
- Chama funções para atualizar a lista de tarefas e os totais.

### Função filtrarTarefas e mostrarTarefas:
- Filtra as tarefas com base no status (vencidas, não vencidas, ou todas).
- Exibe uma mensagem com informações das tarefas filtradas.

### Função atualizarStatusVencimento:
- Obtém a data atual.
- Para cada tarefa, considera a tarefa vencida se a data atual for maior que a data de vencimento.

### Funções para totais (atualizarTotais, contarTarefasPorCategoria, exibirTotais):
-Atualizam e contam diferentes estatísticas sobre as tarefas, como quantidade total, quantidade sem categoria, quantidade vencidas, etc.
-Exibem uma mensagem com os totais.