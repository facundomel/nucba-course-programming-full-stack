export default class UserSession {
	constructor({ user, authToken }) {
		this.user = user;
		this.authToken = authToken;
	}
}
