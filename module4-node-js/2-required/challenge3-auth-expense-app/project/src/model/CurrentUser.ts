import UserRole from "./enum/RoleUser";

export default class CurrentUser {
	userId!: number;
	email!: string;
	role!: UserRole;

	constructor(result: CurrentUser) {
		this.userId = result.userId;
		this.email = result.email;
		this.role = result.role;
	}
}
