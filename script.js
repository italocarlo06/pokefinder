// Pegar os elementos do DOM buscando por ID
const inputPokemon = document.getElementById('pokemon-input');
const searchButton = document.getElementById('search-button');
const pokemonCard =  document.getElementById('pokemon-card-container');

// Função para buscar o Pokémon usando a API
async function buscarPokemon(pokemonNameOrId) {
    //Definir a URL da API usando o nome ou ID do Pokémon fornecido
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/'+pokemonNameOrId.toLowerCase();

    try {
      // Fazer a requisição para a API
      const resposta = await fetch(apiUrl);
      // Verificar se a resposta foi bem-sucedida
      if (!resposta.ok) {
        exibirErro('Pokémon não encontrado. Por favor, verifique o nome ou ID e tente novamente.');
      }   

      // Converter a resposta para JSON
      const dadosPokemon = await resposta.json();
      // Exibir os dados do Pokémon na página
      exibirDadosPokemon(dadosPokemon);
    } catch (error) {
      // Em caso de erro na requisição, exibir uma mensagem de erro
      exibirErro('Ocorreu um erro ao buscar o Pokémon. Por favor, tente novamente.');
    }

}

//Função para exibir uma mensagem de erro
function exibirErro(mensagem) {
    pokemonCard.innerHTML = `<p class="error-message">${mensagem}</p>`;
}

//Função para exibir os dados do Pokémon
function exibirDadosPokemon(dadosPokemon) {
    // Extrair os tipos do Pokémon e formatá-los como uma string
    const tipos = dadosPokemon.types.map(tipo => tipo.type.name).join(', ');
    // Criar o conteúdo HTML para exibir os dados do Pokémon
    // Usar template literals para criar a estrutura do cartão do Pokémon
    // O cartão inclui o nome, imagem, ID, altura, peso e tipos do Pokémon
    // A imagem do Pokémon é obtida a partir do campo 'sprites.front_default' da resposta da API
    // O nome do Pokémon é exibido como um título, e os outros dados são listados em uma lista não ordenada
    pokemonCard.innerHTML = `
        <div class="pokemon-card">
           <h2>${dadosPokemon.name}</h2>
           <img src="${dadosPokemon.sprites.front_default}" alt="${dadosPokemon.name}">
           <ul class="info-list">
             <li><strong>ID:</strong> ${dadosPokemon.id}</li>
             <li><strong>Altura:</strong> ${dadosPokemon.height}</li>
             <li><strong>Peso:</strong> ${dadosPokemon.weight}</li>
             <li><strong>Tipos:</strong> ${tipos}</li>
           </ul>
        </div>
    `;
}

// Adicionar um ouvinte de evento ao botão de busca
// Quando o botão for clicado, a função de busca do Pokémon será chamada com o valor do input
// O valor do input é obtido e os espaços em branco são removidos usando o método trim()
// Se o valor do input não estiver vazio, a função de busca é chamada. Caso contrário, uma mensagem de alerta é exibida solicitando que o usuário insira um nome ou ID válido
// O evento 'click' é usado para detectar quando o botão é clicado, e a função de callback é definida para executar a lógica de busca do Pokémon
// O método addEventListener é usado para associar o evento de clique ao botão de busca, garantindo que a função de busca seja executada sempre que o botão for clicado
searchButton.addEventListener('click', () => {
    // Obter o valor do input e remover espaços em branco
    const pokemonNameOrId = inputPokemon.value.trim();

    if (pokemonNameOrId) {
      buscarPokemon(pokemonNameOrId);  
    } else
    {
        alert('Por favor, insira o nome ou ID do Pokémon.');
    }
} )