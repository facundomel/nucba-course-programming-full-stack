import Movie from "../model/Movie.js";
import Util from "../util/Util.js";

const divExercise4 = document.getElementById("div-exercise-4");
const buttonShowCards = document.getElementById("button-show-cards");
const buttonHideCards = document.getElementById("button-hide-cards");
const cards = document.getElementById("cards");

let movies = [
	new Movie(
		1,
		"El señor de los anillos: La comunidad del anillo",
		"Un hobbit de la Comarca y ocho compañeros emprenden un viaje para destruir el poderoso Anillo Único y salvar la Tierra Media del Señor Oscuro Sauron.",
		"Peter Jackson",
		2001,
		"https://m.media-amazon.com/images/M/MV5BMzgyNjdjOWMtMjAyYy00NzQ4LWIwYTQtZDk2ZDQzYWVlN2IwXkEyXkFqcGdeQXVyMTYzMDM0NTU@._V1_FMjpg_UX720_.jpg"
	),
	new Movie(
		2,
		"Volver al futuro",
		"Marty McFly, un estudiante de secundaria de 17 años, es enviado accidentalmente treinta años al pasado en un DeLorean que viaja en el tiempo, inventado por su gran amigo, el excéntrico científico Doc Brown.",
		"Robert Zemeckis",
		1985,
		"https://m.media-amazon.com/images/M/MV5BYjQxMTIyMWUtMmMyMS00MGNmLTkzNzktOTM2YzMyZmRjYTYzXkEyXkFqcGdeQXVyMTYzMDM0NTU@._V1_.jpg"
	),
	new Movie(
		3,
		"Harry Potter y la piedra filosofal",
		"Un niño huérfano se inscribe en una escuela de magia y hechicería, donde aprende la verdad sobre sí mismo, su familia y el terrible mal que acecha al mundo mágico.",
		"Chris Columbus",
		2001,
		"https://m.media-amazon.com/images/M/MV5BMzFiZjhjODUtMWJhZi00ZDk5LThjY2ItZjNjYjc0OGVjY2FmXkEyXkFqcGdeQXVyMTYzMDM0NTU@._V1_.jpg"
	),
	new Movie(
		4,
		"Spiderman",
		"Al ser mordido por una araña modificada genéticamente, un chico de instituto tímido y estudioso adquiere habilidades de araña que al final tendrá que usar para luchar contra el mal como un superhéroe tras una tragedia familiar.",
		"Sam Raimin",
		2002,
		"https://m.media-amazon.com/images/M/MV5BZDEyN2NhMjgtMjdhNi00MmNlLWE5YTgtZGE4MzNjMTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_FMjpg_UX511_.jpg"
	),
	new Movie(
		5,
		"Fight Club",
		"Un oficinista insomne y un desentendido fabricante de jabones forman un club de lucha clandestino que se convierte en mucho más.",
		"David Fincher",
		1999,
		"https://m.media-amazon.com/images/M/MV5BNzJhZjg3MWQtNDk1Zi00ZjMzLWI1ZjUtNmE2MDg0ZDU4MzZlXkEyXkFqcGdeQXVyMTAyOTE2ODg0._V1_.jpg"
	),
	new Movie(
		6,
		"El Origen",
		"A un ladrón que roba secretos corporativos a través del uso de la tecnología de compartir sueños, se le da la tarea de implantar una idea en la mente de un jefe de una gran empresa.",
		'Christopher "EL REY" Nolan',
		2010,
		"https://m.media-amazon.com/images/M/MV5BMTUzMzUyOTktNmYyNS00YTA1LWIxNmQtMGIzZDYxZGI3OTliXkEyXkFqcGdeQXVyMTYzMDM0NTU@._V1_.jpg"
	),
];

export default new (class Exercise4 {
	renderCard(movie) {
		const { title, description, director, year, image } = movie;

		return `
    <div class="card">
    <img src="${image}" alt="${title}" class="card-img">
    <div class="card-body">
      <h3> ${title} </h3>  
      <p> ${description} </p>
      <p> ${director} </p>
      <p> ${year} </p>
    </div>
    </div>
  `;
	}

	renderAllCards(movies) {
		cards.innerHTML = movies.map(this.renderCard).join("");
	}

	eventClickRenderAllCards() {
		buttonShowCards.addEventListener("click", () => { 
			Util.showSuccessV2(divExercise4);
			this.renderAllCards(movies)
		});
	}

	eventClickHideAllCards() {
		buttonHideCards.addEventListener("click", (e) => {
			e.preventDefault();
			if (cards.innerHTML == "") {
				Util.showErrorV2(divExercise4, "No hay cards para ocultar")
			} else {
				cards.innerHTML = "";
			}
		});
	}
})();
