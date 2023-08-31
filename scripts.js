// scripts.js
const cardsContainer = document.getElementById("cardsContainer");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const modalClose = document.getElementById("modalClose");
const searchInput = document.getElementById("searchInput");

const fetchData = async () => {
  try {
    const response = await fetch("https://storage.googleapis.com/campus-cvs/00000000000-images-lectures/pokemons.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const displayPokemonCards = (pokemonList) => {
  cardsContainer.innerHTML = "";
  pokemonList.forEach((pokemon) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.textContent = `${pokemon.name} - ${pokemon.type.join(", ")}`;
    card.addEventListener("click", () => openModal(pokemon));
    cardsContainer.appendChild(card);
  });
};

const openModal = (pokemon) => {
  modalContent.innerHTML = `
    <h2>${pokemon.name}</h2>
    <p>Type: ${pokemon.type.join(", ")}</p>
    <p>Weight: ${pokemon.weight}</p>
    <p>Moves: ${pokemon.moves.join(", ")}</p>
  `;
  modal.style.display = "block";
};

modalClose.addEventListener("click", () => {
  modal.style.display = "none";
});

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredPokemons = pokemonData.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm));
  displayPokemonCards(filteredPokemons);
});

(async () => {
  const pokemonData = await fetchData();
  displayPokemonCards(pokemonData);
})();
