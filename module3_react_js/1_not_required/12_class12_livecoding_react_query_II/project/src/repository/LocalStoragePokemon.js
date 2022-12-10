export default new (class LocalStoragePokemon {
	getPokemon(key) {
		return JSON.parse(localStorage.getItem(key));
	}

	savePokemon(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	}

	removePokemon(key) {
		localStorage.removeItem(key);
	}
})();
