export default new (class LocalStorage {
	get(key) {
		return JSON.parse(localStorage.getItem(key));
	}

	save(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	}

	remove(key) {
		localStorage.removeItem(key);
	}
})();
