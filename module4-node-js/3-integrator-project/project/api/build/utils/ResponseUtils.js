"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var humps_1 = __importDefault(require("humps"));
var CustomException_1 = __importDefault(require("../model/CustomException"));
var http_status_codes_1 = require("http-status-codes");
var ResponseUtils = /** @class */ (function () {
    function ResponseUtils() {
    }
    ResponseUtils.convertFromSnakeToCamel = function (data) {
        return humps_1.default.camelizeKeys(data);
    };
    ResponseUtils.convertFromCamelToSnake = function (data) {
        return humps_1.default.decamelizeKeys(data);
    };
    ResponseUtils.getException = function (res, error) {
        if (error instanceof CustomException_1.default) {
            res.status(error.statusCode).json(ResponseUtils.convertFromCamelToSnake(error));
            return;
        }
        var statusCode = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        res.status(statusCode).json(ResponseUtils.convertFromCamelToSnake(new CustomException_1.default(error.message, statusCode)));
    };
    return ResponseUtils;
}());
exports.default = ResponseUtils;
//# sourceMappingURL=ResponseUtils.js.map