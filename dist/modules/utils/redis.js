"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const config_1 = __importDefault(require("../../config/config"));
const redisClient = (0, redis_1.createClient)({
    url: config_1.default.redis.url
});
const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log('Redis client connected...');
    }
    catch (err) {
        console.log(err.message);
        setTimeout(connectRedis, 5000);
    }
};
connectRedis();
redisClient.on('error', (err) => console.log(err));
exports.default = redisClient;
//# sourceMappingURL=redis.js.map