export default class UserSession {
	name: string;
	email: string;
	password: string;

	constructor(userSession: any) {
		this.name = userSession.name;
		this.email = userSession.email;
		this.password = userSession.password;
	}
}
