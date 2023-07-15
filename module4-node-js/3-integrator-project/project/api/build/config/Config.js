"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_status_codes_1 = require("http-status-codes");
var CustomException_1 = __importDefault(require("../model/CustomException"));
require("dotenv/config");
var Config = /** @class */ (function () {
    function Config() {
        if (process.env.ACCESS_TOKEN_SECRET)
            this.accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
        else
            throw new CustomException_1.default("Secret access token is not present", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        if (process.env.REFRESH_TOKEN_SECRET)
            this.refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
        else
            throw new CustomException_1.default("Secret refresh token is not present", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        if (process.env.APP_PORT)
            this.appPort = Number(process.env.APP_PORT);
        else
            throw new CustomException_1.default("App port is not present", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
    Config.getInstance = function () {
        if (!Config.instance) {
            Config.instance = new Config();
        }
        return Config.instance;
    };
    return Config;
}());
exports.default = Config;
//# sourceMappingURL=Config.js.map