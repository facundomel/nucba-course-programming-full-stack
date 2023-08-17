export default class UserDataAndAuthToken {
	constructor(decodedToken, authToken) {
		this.user = { id: decodedToken.userId, firstName: decodedToken.firstName, lastName: decodedToken.lastName, email: decodedToken.email };
		this.authToken = { accessToken: authToken.accessToken, refreshToken: authToken.refreshToken };
	}
}
