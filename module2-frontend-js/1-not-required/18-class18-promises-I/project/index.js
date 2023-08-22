import StarWarsService from "./service/StarWarsService.js";

function getAllCharacters() {
	StarWarsService.getAllCharacters()
		.then((data) => {
			if (data.length > 0) {
				console.log("Personajes de Star Wars: ");
				console.log(data);
			} else {
				console.log("No hay personajes de Star Wars para mostrar");
			}
		})
		.catch((error) => {
			console.log(`Error: ${error}`);
		});
}

function init() {
	getAllCharacters();
}

init();
