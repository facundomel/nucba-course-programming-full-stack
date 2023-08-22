import { HttpStatusCode } from "axios";
import CustomException from "../model/CustomException";

export default class Config {
	static API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
	static HEADERS_DEFAULT = { Accept: "application/json, text/plain, */*", "Content-Type": "application/json" };

	static validateEnvironmentVariables = () => {
		if (!this.API_BASE_URL) {
			throw new CustomException("", "Environment variable API_BASE_URL is not present", HttpStatusCode.InternalServerError);
		}
	};
}
