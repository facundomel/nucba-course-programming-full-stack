"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_status_codes_1 = require("http-status-codes");
var CustomException_1 = __importDefault(require("./model/CustomException"));
var ResponseUtils_1 = __importDefault(require("./utils/ResponseUtils"));
var Config_1 = __importDefault(require("./config/Config"));
var Main = /** @class */ (function () {
    function Main() {
    }
    Main.init = function () {
        Config_1.default.getInstance();
        var port = Config_1.default.getInstance().appPort;
        var app = (0, express_1.default)();
        app.use(express_1.default.json());
        app.use("/api", function (req, res) {
            res
                .status(http_status_codes_1.StatusCodes.OK)
                .json(ResponseUtils_1.default.convertFromCamelToSnake(new CustomException_1.default("Hola desde la API", http_status_codes_1.StatusCodes.OK)));
        });
        // app.use("/api", UsersRouter.init());
        // app.use("/api", ExpensesRouter.init());
        app.all("*", function (req, res) {
            res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json(ResponseUtils_1.default.convertFromCamelToSnake(new CustomException_1.default("URL not found", http_status_codes_1.StatusCodes.NOT_FOUND)));
        });
        app.listen(port, function () {
            console.log("\uD83D\uDDF2 Server running on port ".concat(port, " \uD83D\uDDF2"));
        });
    };
    return Main;
}());
Main.init();
//# sourceMappingURL=index.js.map