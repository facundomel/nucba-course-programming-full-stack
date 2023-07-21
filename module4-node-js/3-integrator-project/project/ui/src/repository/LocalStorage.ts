export const KEY_RECIPES_ALL = "recipesAll";
export const KEY_USER_SESSION = "userSession";

export default new (class LocalStorage {
	get(key: string) {
		const item = localStorage.getItem(key);
		return item ? JSON.parse(item) : null;
	}

	save(key: string, value: any) {
		localStorage.setItem(key, JSON.stringify(value));
	}

	remove(key: string) {
		localStorage.removeItem(key);
	}
})();
