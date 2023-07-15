import { StatusCodes } from "http-status-codes";
import CustomException from "../model/CustomException";
import "dotenv/config";

export default class Config {
	private static instance: Config;
	accessTokenSecret: string;
	refreshTokenSecret: string;
	appPort: number;

	constructor() {
		if (process.env.ACCESS_TOKEN_SECRET) this.accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
		else throw new CustomException("Secret access token is not present", StatusCodes.INTERNAL_SERVER_ERROR);

		if (process.env.REFRESH_TOKEN_SECRET) this.refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
		else throw new CustomException("Secret refresh token is not present", StatusCodes.INTERNAL_SERVER_ERROR);

		if (process.env.APP_PORT) this.appPort = Number(process.env.APP_PORT);
		else throw new CustomException("App port is not present", StatusCodes.INTERNAL_SERVER_ERROR);
	}

	static getInstance(): Config {
		if (!Config.instance) {
			Config.instance = new Config();
		}

		return Config.instance;
	}
}
