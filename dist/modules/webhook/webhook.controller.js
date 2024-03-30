"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testWebhook = void 0;
// import mongoose from 'mongoose';
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
// import config from '../../config/config';
// import ApiError from '../errors/ApiError';
// import pick from '../utils/pick';
// import { IOptions } from '../paginate/paginate';
// import * as webhookService from './webhook.service';
// import redisClient from '../utils/redis';
const crypto_1 = __importDefault(require("crypto"));
exports.testWebhook = (0, catchAsync_1.default)(async (req, res) => {
    //validate event
    const hash = crypto_1.default.createHmac('sha512', "sk_test_87e1178e601bb34991a96c9e9008a691fb8ee414").update(JSON.stringify(req.body)).digest('hex');
    if (hash == req.headers['x-paystack-signature']) {
        // Retrieve the request's body
        const event = req.body;
        // Do something with event
        console.log("Payment type: ", event.event);
        console.log("Customer Email: ", event.data.customer);
        console.log("Amount: ", event.data.requested_amount);
        console.log(event);
    }
    res.send(200);
    //   const webhook = await webhookService.testWebhook(req.body);
    //   res.status(httpStatus.CREATED).send(webhook);
});
// public key = "pk_test_1a3a2f4b44671480a0624fe4ec636eb865e9d568"
//# sourceMappingURL=webhook.controller.js.map