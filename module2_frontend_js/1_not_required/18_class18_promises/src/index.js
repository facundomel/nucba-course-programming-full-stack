import StarWars from "./service/StarWars.js";

function getAllCharacters() {
	try {
		StarWars.getAllCharacters()
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
