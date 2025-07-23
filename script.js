const pokemonInput = document.getElementById('pokemon-input');
const searchButton = document.getElementById('search-button');
const pokemonCardContainer = document.getElementById('pokemon-card-container');

// Função para buscar os dados do Pokémon
async function fetchPokemon(nameOrId) {
    try {
        const lowerCaseName = nameOrId.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${lowerCaseName}`);

        if (!response.ok) {
            throw new Error(`Pokémon '${nameOrId}' não encontrado.`);
        }

        const data = await response.json();
        renderPokemonCard(data);

    } catch (error) {
        renderError(error.message);
    }
}

// Função para renderizar o card do Pokémon na tela
function renderPokemonCard(pokemon) {
    // Limpa o conteúdo anterior
    pokemonCardContainer.innerHTML = '';

    const types = pokemon.types.map(typeInfo => typeInfo.type.name).join(', ');

    const cardHTML = `
        <div class="pokemon-card">
            <h2>${pokemon.name}</h2>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="pokemon-image">
            <ul class="info-list">
                <li><strong>ID:</strong> <span>${pokemon.id}</span></li>
                <li><strong>Altura:</strong> <span>${(pokemon.height / 10).toFixed(1)} m</span></li>
                <li><strong>Peso:</strong> <span>${(pokemon.weight / 10).toFixed(1)} kg</span></li>
                <li><strong>Tipo(s):</strong> <span class="capitalize">${types}</span></li>                
            </ul>
        </div>
    `;

    pokemonCardContainer.innerHTML = cardHTML;
}

// Função para exibir mensagens de erro
function renderError(message) {
    pokemonCardContainer.innerHTML = `<p class="error-message">${message}</p>`;
}

// Adiciona um listener de evento ao botão de busca
searchButton.addEventListener('click', () => {
    const pokemonName = pokemonInput.value.trim();
    if (pokemonName) {
        fetchPokemon(pokemonName);
    } else {
        renderError('Por favor, digite o nome ou ID de um Pokémon.');
    }
});

// Opcional: Adiciona um listener para a tecla "Enter" no input
pokemonInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        searchButton.click();
    }
});