import { StatusCodes } from "http-status-codes";
import CustomException from "../model/CustomException";
import User from "../model/entity/User";
import UserLogin from "../model/LoginUser";
import UserService from "./UserService";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AuthToken from "../model/AuthToken";
import Config from "../config/Config";
import UserRoleService from "./UserRoleService";
import UserRole from "../model/entity/UserRole";

export default class AuthService {
	static readonly accessTokenSecret: string = Config.getInstance().accessTokenSecret;
	static readonly refreshTokenSecret: string = Config.getInstance().refreshTokenSecret;

	static login = async (loginData: UserLogin): Promise<any> => {
		try {
			let user: User = (await UserService.getUserByEmail(loginData.email, false)) as User;
			const result = await bcrypt.compare(loginData.password, user.password);
			if (!result) {
				throw new CustomException("Password is not valid", StatusCodes.BAD_REQUEST);
			}
			const userRole: UserRole = await UserRoleService.getUserRoleById(user.roleId);
			const accessToken = jwt.sign({ userId: user.id, email: user.email, role: userRole.role }, this.accessTokenSecret, {
				expiresIn: "12h",
			});
			const refreshToken = jwt.sign({ userId: user.id, email: user.email, role: userRole.role }, this.refreshTokenSecret, {
				expiresIn: "1d",
			});
			return {
				user: { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email },
				authToken: new AuthToken(accessToken, refreshToken),
			};
		} catch (error: any) {
			throw error;
		}
	};

	static refreshToken = async (autorizationToken: string): Promise<any> => {
		try {
			const data: any = jwt.verify(autorizationToken, this.refreshTokenSecret);
			if (data) {
				let user: User = (await UserService.getUserByEmail(data.email, true)) as User;
				const userRole: UserRole = await UserRoleService.getUserRoleById(user.roleId);
				const accessToken = jwt.sign({ userId: user.id, email: user.email, role: userRole.role }, this.accessTokenSecret, {
					expiresIn: "12h",
				});
				const refreshToken = jwt.sign({ userId: user.id, email: user.email, role: userRole.role }, this.refreshTokenSecret, {
					expiresIn: "1d",
				});
				return {
					user: { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email },
					authToken: new AuthToken(accessToken, refreshToken),
				};
			}
		} catch (error: any) {
			if (error.name == "TokenExpiredError") {
				throw new CustomException("Not authenticated: Refresh token expired", StatusCodes.UNAUTHORIZED);
			}
			throw new CustomException("Not authenticated: Refresh token is not valid", StatusCodes.UNAUTHORIZED);
		}
	};
}
