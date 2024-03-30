"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testWebhook = void 0;
const joi_1 = __importDefault(require("joi"));
exports.testWebhook = {
    body: joi_1.default.object().keys({}),
};
//# sourceMappingURL=webhook.validation.js.map