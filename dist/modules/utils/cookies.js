"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenCookieOptions = exports.accessTokenCookieOptions = void 0;
const config_1 = __importDefault(require("../../config/config"));
exports.accessTokenCookieOptions = {
    expires: new Date(Date.now() + config_1.default.jwt.accessExpirationMinutes * 60 * 1000),
    maxAge: config_1.default.jwt.accessExpirationMinutes * 60 * 1000,
    httpOnly: true,
    path: '/',
    domain: config_1.default.env === "development" ? '.localhost' : '.trietix.com',
    secure: config_1.default.env === "development" ? false : true,
    sameSite: config_1.default.env === "development" ? 'lax' : 'none'
};
exports.refreshTokenCookieOptions = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    path: '/',
    domain: config_1.default.env === "development" ? '.localhost' : '.trietix.com',
    secure: config_1.default.env === "development" ? false : true,
    sameSite: config_1.default.env === "development" ? 'lax' : 'none'
};
//# sourceMappingURL=cookies.js.map