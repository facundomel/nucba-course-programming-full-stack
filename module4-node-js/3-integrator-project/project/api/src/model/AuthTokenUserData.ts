import User from "./entity/User";
import UserRole from "./entity/UserRole";

export default class AuthTokenUserData {
	userId: number;
	firstName: string;
	lastName: string;
	email: string;
	role: string;

	constructor(user: User, userRole: UserRole) {
		this.userId = user.id;
		this.firstName = user.firstName;
		this.lastName = user.lastName;
		this.email = user.email;
		this.role = userRole.role;
	}
}
