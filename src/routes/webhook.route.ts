import express, { Router } from 'express';
import { webhookController } from '../modules/webhook';
const router: Router = express.Router();

router
  .route('/')
  .post(webhookController.testWebhook)

export default router;
