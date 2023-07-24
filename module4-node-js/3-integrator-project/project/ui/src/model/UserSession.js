export default class UserSession {
	constructor({ user, authToken }) {
		this.id = user.id;
		this.firstName = user.firstName;
		this.lastName = user.lastName;
		this.email = user.email;
		this.accessToken = authToken.accessToken;
		this.refreshToken = authToken.refreshToken;
	}
}
