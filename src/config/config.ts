import Joi from 'joi';
import 'dotenv/config';

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    DATABASE: Joi.string().required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    REDIS_URL: Joi.string().description('Redis url'),
    RABBITMQ_URL: Joi.string().description('Rabbitmq url'),
    SESSION_TTL: Joi.number().required(),
    SESSION_NAME: Joi.string().required(),
    SESSION_SECRET: Joi.string().required(),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which verify email token expires'),
    CLOUDINARY_CLOUD_NAME: Joi.string().description('The cloud_name used in cloudinary'),
    CLOUDINARY_API_KEY : Joi.string().description('Api key for cloudinary'),
    CLOUDINARY_API_SECRET: Joi.string().description('Api secret for cloudinary'),
    CLIENT_URL: Joi.string().required().description('Client url'),
    EXCHANGE_NAME: Joi.string().required().description('Exchange name'),
    APP_SECRET: Joi.string().required().description('App Secret'),
    TICKET_SERVICE: Joi.string().required().description('Ticket service'),
    EMAIL_SERVICE: Joi.string().required().description('Ticket service'),
    PAYOUT_SERVICE: Joi.string().required().description('Ticket service'),
    EVENT_SERVICE: Joi.string().required().description('Ticket service'),
    INVITE_SERVICE: Joi.string().required().description('Ticket service'),
    MAIN_SERVICE: Joi.string().required().description('Ticket service')
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.DATABASE) + "?retryWrites=true&w=majority",
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  cloudinary:{
    cloudName: envVars.CLOUDINARY_CLOUD_NAME,
    apiKey: envVars.CLOUDINARY_API_KEY,
    apiSecret: envVars.CLOUDINARY_API_SECRET,
  },
  redis: {
    url: envVars.REDIS_URL
  },
  rabbitmq: {
    url: envVars.RABBITMQ_URL
  },
  message: {
    exchangeName: envVars.EXCHANGE_NAME,
    appSecret: envVars.APP_SECRET,
  },
  services: {
    ticket: envVars.TICKET_SERVICE,
    payout: envVars.PAYOUT_SERVICE,
    invite: envVars.INVITE_SERVICE,
    event: envVars.EVENT_SERVICE,
    email: envVars.EMAIL_SERVICE,
    main: envVars.MAIN_SERVICE,
  },
  session: {
    name: envVars.SESSION_NAME,
    ttl: envVars.SESSION_TTL,
    secret: envVars.SESSION_SECRET
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
    cookieOptions: {
      httpOnly: true,
      secure: envVars.NODE_ENV === 'production',
      signed: true,
    },
  },
  clientUrl: envVars.CLIENT_URL,
};

export default config;
