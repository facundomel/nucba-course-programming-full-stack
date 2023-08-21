import { UserRoleStringEnum } from "./enum/UserRoleEnum";

export default class CurrentUser {
	userId!: number;
	email!: string;
	role!: UserRoleStringEnum;

	constructor(currentUser: CurrentUser) {
		this.userId = currentUser.userId;
		this.email = currentUser.email;
		this.role = currentUser.role;
	}
}
