export default class User {
	constructor(id, username, password) {
		this.id = id;
		this.username = username;
		this.password = password;
	}

	static createUser(user) {
		return new User(user.id, user.username, user.password);
	}
}
