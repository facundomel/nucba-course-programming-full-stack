import { StatusCodes } from "http-status-codes";
import Exception from "../model/Exception";
import User from "../model/entity/User";
import Login from "../model/Login";
import UserService from "./UserService";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AuthToken from "../model/AuthToken";
import Config from "../config/Config";

export default class AuthService {
	static readonly accessTokenSecret: string = Config.getInstance().accessTokenSecret;
	static readonly refreshTokenSecret: string = Config.getInstance().refreshTokenSecret;

	static login = async (loginData: Login): Promise<any> => {
		try {
			let user: User = (await UserService.getUserByEmail(loginData.email)) as User;
			const result = await bcrypt.compare(loginData.password, user.password);
			if (!result) {
				throw new Exception("Password is not valid", StatusCodes.BAD_REQUEST);
			}
			const accessToken = jwt.sign({ userId: user.id, email: user.email, role: user.role }, this.accessTokenSecret, {
				expiresIn: "1d",
			});
			const refreshToken = jwt.sign({ userId: user.id, email: user.email, role: user.role }, this.refreshTokenSecret, {
				expiresIn: "2d",
			});
			return new AuthToken(accessToken, refreshToken);
		} catch (error: any) {
			throw error;
		}
	};

	static refreshToken = async (autorizationToken: string): Promise<any> => {
		try {
			const data: any = jwt.verify(autorizationToken, this.refreshTokenSecret);
			if (data) {
				let user: User = (await UserService.getUserByEmail(data.email)) as User;
				const accessToken = jwt.sign({ userId: user.id, email: user.email, role: user.role }, this.accessTokenSecret, {
					expiresIn: "1d",
				});
				const refreshToken = jwt.sign({ userId: user.id, email: user.email, role: user.role }, this.refreshTokenSecret, {
					expiresIn: "2d",
				});
				return new AuthToken(accessToken, refreshToken);
			}
		} catch (error: any) {
			if (error.name == "TokenExpiredError") {
				throw new Exception("Not authorized: Token expired", StatusCodes.UNAUTHORIZED);
			}
			throw new Exception("Not authorized: Token is not valid", StatusCodes.UNAUTHORIZED);
		}
	};
}
