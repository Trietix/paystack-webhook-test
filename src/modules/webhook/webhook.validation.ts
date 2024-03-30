import Joi from 'joi';

export const testWebhook = {
  body: Joi.object().keys({}),
};
