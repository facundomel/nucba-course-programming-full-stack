import Pokemon from "./model/Pokemon.js";
import utils from "./utils/Utils.js";
import pokemonService from "./service/PokemonService.js";

// Constants
const cardsPokemon = document.getElementById("cards-pokemon");
const card = document.getElementById("card");
const form = document.getElementById("form");
const inputPokemonId = document.getElementById("input-pokemon-id");
const buttonGetPokemon = document.getElementById("button-get-pokemon");
const buttonrefreshPage = document.getElementById("button-refresh-page");

// Functions
function validInputPokemonId() {
	if (inputPokemonId.value == "") utils.clearErrorAndSuccess();
}

function debounce(callback, timeout = 5000) {
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			callback.apply(this, args);
		}, timeout);
	};
}

async function getPokemonById() {
	if (inputPokemonId.value != "") {
		try {
			const pokemon = await pokemonService.getPokemonById(inputPokemonId.value);
			utils.showSuccess();
			renderPokemon(pokemon);
		} catch (error) {
			if (error.response.status == 404) utils.showError("El pokémon no existe");
		}
	} else {
		utils.showError("Debe completar este campo");
	}
	inputPokemonId.focus();
}

function renderPokemon(pokemon) {
	if (pokemon != null) {
		const poke = new Pokemon(pokemon);
		cardsPokemon.classList.add("cards-pokemon");
		cardsPokemon.classList.remove("cards-pokemon-none");

		card.innerHTML = `<img src=${poke.image} class="card-img-top" alt=${poke.name}>
		<div class="card-body">
			<div>
				<h5 class="card-title">${poke.name.toUpperCase()}</h5>
				<div class="card-text">
					<p>Altura: ${poke.height} mts.</p>
					<p>Peso: ${poke.weight} kgs.</p>
					<div class="pokemon-types">
						${poke.types
							.map((type) => {
								return `<p class="${type.type.name} pokemon-type">${type.type.name}</´p>`;
							})
							.join("")}
					</div>
				</div>
			</div>
		</div>`;
	} else {
		cardsPokemon.classList.add("cards-pokemon-none");
		cardsPokemon.classList.remove("cards-pokemon");
		card.innerHTML = "";
	}
}

// Events
function eventInputChange() {
	form.addEventListener(
		"input",
		debounce((e) => {
			switch (e.target.id) {
				case "input-pokemon-id":
					validInputPokemonId();
					break;
			}
		})
	);
}

function eventButtonGetPokemon() {
	buttonGetPokemon.addEventListener("click", (e) => {
		e.preventDefault();
		getPokemonById();
	});
}

function eventButtonRefresh() {
	buttonrefreshPage.addEventListener("click", (e) => {
		e.preventDefault();
		document.location.reload();
	});
}

// Init
async function init() {
	eventInputChange();
	eventButtonGetPokemon();
	eventButtonRefresh();
}

init();
