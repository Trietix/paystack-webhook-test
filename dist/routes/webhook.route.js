"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const webhook_1 = require("../modules/webhook");
const router = express_1.default.Router();
router
    .route('/')
    .post(webhook_1.webhookController.testWebhook);
exports.default = router;
//# sourceMappingURL=webhook.route.js.map