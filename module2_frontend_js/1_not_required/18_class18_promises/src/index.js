import StarWarsService from "./service/StarWarsService.js";

function getAllCharacters() {
	try {
		StarWarsService.getAllCharacters()
			.then((data) => {
				console.log("Personajes de Star Wars: ");
				console.log(data.results);
			})
			.catch((error) => {
				console.log(`Error: ${error}`);
			});
	} catch (error) {
		console.log(`Error: ${error}`);
	}
}

function init() {
	getAllCharacters();
}

init();
