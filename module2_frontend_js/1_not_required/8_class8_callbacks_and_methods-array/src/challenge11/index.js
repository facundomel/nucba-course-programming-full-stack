import Movie from './model/Movie.js';

const pokemon = new Movie("Pokemon:La Pelicula", 75, 1998);
const avengers = new Movie("Avengers: Endgame", 181, 2019);
const starWars = new Movie("Star Wars: El despertar de la fuerza", 135, 2015);
const batman = new Movie("Batman vs Superman", 151, 2016);
const wonderWoman = new Movie("La Mujer Maravilla", 141, 2017);

function createArrayMovies() {
	let movies = [];
  movies.push(pokemon, avengers, starWars, batman, wonderWoman);
  return movies;
}

function getMoviesWithDurationGreater150Minutes(movies) {
  return movies.filter((movie) => {
    return movie.duration > 150;
  })
}

console.log("Array de películas que duran más de 150 minutos: ");
console.log(getMoviesWithDurationGreater150Minutes(createArrayMovies()));