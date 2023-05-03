import Player from "./model/Player.js";

const player1 = new Player("Facu");
player1.addAchievement("Logro 1", "Logro 2");
player1.addClubName("Club 1", "Club 2", "Club 3");

console.log(`Nombre completo del jugador: ${player1.getFullName()}`);
console.log(`Logros: ${player1.getAchievement().length > 0 ? player1.getAchievement() : "No tiene logros"}`);
console.log(`Clubes: ${player1.getClubsNames().length > 0 ? player1.getClubsNames() : "No tiene clubes"}`);
console.log(`Cantidad de clubes: ${player1.getCountClubsNames()}`);
