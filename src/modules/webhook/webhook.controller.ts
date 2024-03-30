// import httpStatus from 'http-status';
import { Request, Response } from 'express';
// import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
// import config from '../../config/config';
// import ApiError from '../errors/ApiError';
// import pick from '../utils/pick';
// import { IOptions } from '../paginate/paginate';
// import * as webhookService from './webhook.service';
// import redisClient from '../utils/redis';
import crypto from 'crypto';

export const testWebhook = catchAsync(async (req: Request, res: Response) => {
    //validate event
    const hash = crypto.createHmac('sha512', "sk_test_87e1178e601bb34991a96c9e9008a691fb8ee414").update(JSON.stringify(req.body)).digest('hex');
    if (hash == req.headers['x-paystack-signature']) {
        // Retrieve the request's body
        const event = req.body;
        // Do something with event
        console.log("Payment type: ", event.event)
        console.log("Customer Email: ", event.customer.email);
        console.log("Amount: ", event.data.requested_amount);
        console.log(event);  
    }
    res.send(200);
//   const webhook = await webhookService.testWebhook(req.body);
//   res.status(httpStatus.CREATED).send(webhook);
});

// public key = "pk_test_1a3a2f4b44671480a0624fe4ec636eb865e9d568"