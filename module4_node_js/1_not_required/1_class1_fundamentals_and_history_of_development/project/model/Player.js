export default class Player {
	#fullName = null;
	#achievements = [];
	#clubsNames = [];

	constructor(fullName) {
		this.#fullName = fullName;
	}

	addAchievement = (...achievements) => {
		this.#achievements.push(achievements);
	};

	addClubName = (...clubsNames) => {
		this.#clubsNames.push(clubsNames);
	};

	getFullName = () => {
		return this.#fullName;
	};

	getAchievement = () => {
		return this.#achievements;
	};

	getClubsNames = () => {
		return this.#clubsNames;
	};

	getCountClubsNames = () => {
		return this.#clubsNames.length;
	};
}
