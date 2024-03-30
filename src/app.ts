import express, { Express } from "express";
import helmet from "helmet";
// @ts-ignore
import xss from "xss-clean";
import ExpressMongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import cors from "cors";
import httpStatus from "http-status";
import config from "./config/config";
import { morgan } from "./modules/logger";
import cookieParser from "cookie-parser";
import routes from './routes';
import { ApiError, errorConverter, errorHandler } from "./modules/errors";
const app: Express = express();

if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// enable cors
app.use(
  cors({
    origin: ["52.31.139.75", "52.49.173.169", "52.214.14.220"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
    methods: ["GET", "PATCH", "POST", "DELETE", "OPTIONS"],
    exposedHeaders: ["Authorization", "Set-Cookie"],
    credentials: true,
  })
);
app.options("*", cors());

// parse cookies
app.use(cookieParser());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(ExpressMongoSanitize());

// gzip compression
app.use(compression());

app.use("/", routes);
// send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
