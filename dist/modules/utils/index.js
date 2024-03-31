"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishMessage = exports.createChannel = exports.checkRights = exports.generateRandomAlphanumericWord = exports.getCookieDomain = exports.authLimiter = exports.pick = exports.catchAsync = void 0;
const errors_1 = require("../errors");
const catchAsync_1 = __importDefault(require("./catchAsync"));
exports.catchAsync = catchAsync_1.default;
const pick_1 = __importDefault(require("./pick"));
exports.pick = pick_1.default;
const config_1 = __importDefault(require("../../config/config"));
const rateLimiter_1 = __importDefault(require("./rateLimiter"));
exports.authLimiter = rateLimiter_1.default;
const amqplib_1 = __importDefault(require("amqplib"));
function generateRandomAlphanumericWord(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}
exports.generateRandomAlphanumericWord = generateRandomAlphanumericWord;
;
function extractSubdomain(url) {
    const subdomainMatch = url.match(/^(?:https?:\/\/)?([^./]+)\./);
    if (subdomainMatch && subdomainMatch.length > 1) {
        return subdomainMatch[1];
    }
    return null;
}
const checkRights = (role, url) => {
    let subdomain = extractSubdomain(url);
    if (subdomain !== null) {
        if (role !== subdomain) {
            throw new errors_1.ApiError(401, `You're not a(n) ${subdomain}`);
        }
    }
    else if (role !== "user") {
        throw new errors_1.ApiError(403, "You're not a user");
    }
    ;
};
exports.checkRights = checkRights;
const getCookieDomain = (req) => {
    let url = req === null || req === void 0 ? void 0 : req.headers.referer;
    let subdomain = extractSubdomain(url);
    if (config_1.default.env === "development") {
        if (subdomain === "organizer") {
            return ".localhost:3000";
        }
        else if (subdomain === "guru") {
            return ".localhost:3000";
        }
        else {
            return "localhost";
        }
    }
    else {
        if (subdomain === "organizer") {
            return "organizer.trietix.com";
        }
        else if (subdomain === "guru") {
            return "guru.trietix.com";
        }
        else {
            return "trietix.com";
        }
    }
};
exports.getCookieDomain = getCookieDomain;
const createChannel = async () => {
    try {
        const connection = await amqplib_1.default.connect(config_1.default.rabbitmq.url);
        const channel = await connection.createChannel();
        // @ts-ignore
        await channel.assertQueue(config_1.default.message.exchangeName, "direct", { durable: true });
        return channel;
    }
    catch (err) {
        throw err;
    }
};
exports.createChannel = createChannel;
const publishMessage = (channel, queue, service, msg) => {
    // channel.publish(config.message.exchangeName, service, Buffer.from(msg));
    channel.sendToQueue(queue, service, Buffer.from(msg));
    console.log("Sent: ", msg);
};
exports.publishMessage = publishMessage;
//# sourceMappingURL=index.js.map