const pokeContainer = document.querySelector("#pokeContainer");
const pokemonCount = 151;
const colors = {
  fire: "#E26D18",
  grass: "#61AF3A",
  electric: "#E0B610",
  water: "#5280ED",
  ground: "#DBB650",
  rock: "#A48F32",
  fairy: "#F770FF",
  poison: "#913A91",
  bug: "#9CAB1D",
  dragon: "#5F21F4",
  psychic: "#F83C74",
  flying: "#9B87D8",
  fighting: "#B82D26",
  normal: "#9C9C6C",
};

const mainTypesList = Object.keys(colors);

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemonCount; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const resp = await fetch(url);
  const data = await resp.json();
  createPokemonCard(data);
};

const createPokemonCard = (poke) => {
  const card = document.createElement("div");
  card.classList.add("pokemon");

  const name = poke.name[0].toUpperCase() + poke.name.slice(1);
  const id = poke.id.toString().padStart(3, "0");

  const types = poke.types.map((type) => type.type.name);
  const mainType = mainTypesList.find((type) => types.includes(type)) || types[0];
  const color = colors[mainType];

  card.style.backgroundColor = color;

  const pokemonInnerHTML = `
    <div class="imgContainer">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
         <small class="type">Type: <span>${types.join(", ")}</span></small>
    </div>
    `;

  card.innerHTML = pokemonInnerHTML;

  const link = document.createElement("a");
  link.href = `atkitens/pokemon.html?id=${poke.id}`; 
  link.appendChild(card);


  pokeContainer.appendChild(link);
};

fetchPokemons();