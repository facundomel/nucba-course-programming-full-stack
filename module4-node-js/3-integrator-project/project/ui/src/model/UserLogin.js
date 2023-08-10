export default class UserLogin {
	constructor(email, password) {
		if (email === undefined) {
			this.email = "";
		} else {
			this.email = email;
		}
		
		if (password === undefined) {
			this.password = "";
		} else {
			this.password = password;
		}
	}
}
