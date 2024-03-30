"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.convertMBToByte = void 0;
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config/config"));
const logger_1 = __importDefault(require("./modules/logger/logger"));
const convertMBToByte = (mb) => mb * 1024 * 1024;
exports.convertMBToByte = convertMBToByte;
let server;
server = app_1.default.listen(config_1.default.port, () => {
    logger_1.default.info(`Paystack webhook test listening to port ${config_1.default.port}`);
});
const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger_1.default.info("Server closed");
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
};
setInterval(() => {
    console.log("Initiating scheduling...");
    fetch("https://google.com", {
        method: "GET",
    })
        .then((res) => console.log(`Pinged: ${res.status}`))
        .catch((err) => console.log(`Error pinging server: ${err}`));
}, 4 * 60 * 1000);
const unexpectedErrorHandler = (error) => {
    logger_1.default.error(error);
    exitHandler();
};
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
process.on("SIGTERM", () => {
    logger_1.default.info("SIGTERM received");
    if (server) {
        server.close();
    }
});
//# sourceMappingURL=index.js.map