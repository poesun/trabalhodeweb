async function getPokemonMoves(pokemonId) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  if (response.ok) {
    const pokemonData = await response.json();
    const moves = pokemonData.moves.filter(move => move.version_group_details[0].version_group.name === "red-blue");
    const moveInfo = await Promise.all(moves.map(async move => {
      const moveResponse = await fetch(move.move.url);
      if (moveResponse.ok) {
        const moveData = await moveResponse.json();
        return {
          name: moveData.name,
          type: moveData.type.name,
          power: moveData.power,
          accuracy: moveData.accuracy,
          pp: moveData.pp,
          description: moveData.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text
        };
      } else {
        return null;
      }
    }));
    return moveInfo.filter(move => move !== null);
  } else {
    return null;
  }
}

async function getFirstGenPokemonMoves() {
  const firstGenPokemonIds = Array.from({ length: 151 }, (_, index) => index + 1);
  let allMoves = [];
  for (const pokemonId of firstGenPokemonIds) {
    const moves = await getPokemonMoves(pokemonId);
    if (moves) {
      allMoves = allMoves.concat(moves);
    }
  }
  return allMoves;
}

function displayMoves(moves) {
  const movesList = document.getElementById("moves-list");
  for (const move of moves) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
          <strong class="type-${move.type}">${move.name}</strong> - ${move.type}<br>
          <em>Power:</em> ${move.power}<br>
          <em>Accuracy:</em> ${move.accuracy}<br>
          <em>PP:</em> ${move.pp}<br>
          <em>Descrição:</em> ${move.description}<br>
        `;
    movesList.appendChild(listItem);
  }
}

getFirstGenPokemonMoves().then(firstGenMoves => {
  displayMoves(firstGenMoves);
});



// async function getFirstGenPokemonMoves() {
//   // Código para obter os ataques da primeira geração

//   // Retorna uma Promise com os ataques da primeira geração
// }

function displayMoves(moves) {
  const movesList = document.getElementById("moves-list");

  let currentPage = 1;
  const movesPerPage = 30;
  const totalMoves = moves.length;
  const totalPages = Math.ceil(totalMoves / movesPerPage);

  function showMoves(page) {
    movesList.innerHTML = "";
    const startIndex = (page - 1) * movesPerPage;
    const endIndex = startIndex + movesPerPage;
    const displayedMoves = moves.slice(startIndex, endIndex);

    for (const move of displayedMoves) {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <strong class="move"><span class="type type-${move.type}">${move.name}</span></strong> - ${move.type}<br>
        <em>Power:</em> ${move.power}<br>
        <em>Accuracy:</em> ${move.accuracy}<br>
        <em>PP:</em> ${move.pp}<br>
        <em>Descrição:</em> ${move.description}
      `;
      movesList.appendChild(listItem);
    }
  }

  function updatePaginationButtons() {
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");

    if (currentPage === 1) {
      prevButton.disabled = true;
    } else {
      prevButton.disabled = false;
    }

    if (currentPage === totalPages) {
      nextButton.disabled = true;
    } else {
      nextButton.disabled = false;
    }
  }

  function goToPreviousPage() {
    if (currentPage > 1) {
      currentPage--;
      showMoves(currentPage);
      updatePaginationButtons();
    }
  }

  function goToNextPage() {
    if (currentPage < totalPages) {
      currentPage++;
      showMoves(currentPage);
      updatePaginationButtons();
    }
  }

  const prevButton = document.getElementById("prev-button");
  const nextButton = document.getElementById("next-button");

  prevButton.addEventListener("click", goToPreviousPage);
  nextButton.addEventListener("click", goToNextPage);

  showMoves(currentPage);
  updatePaginationButtons();
}

getFirstGenPokemonMoves().then(firstGenMoves => {
  displayMoves(firstGenMoves);
});