import app from './app';
import config from './config/config';
import logger from './modules/logger/logger';

export const convertMBToByte = (mb: number): number => mb * 1024 * 1024;


let server: any;
export let io: any;
server = app.listen(config.port, () => {
  logger.info(`Paystack webhook test listening to port ${config.port}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

setInterval(() => {
  console.log("Initiating scheduling...");
  fetch(
    "https://google.com",
    {
      method: "GET",
    }
  )
    .then((res: any) => console.log(`Pinged: ${res.status}`))
    .catch((err: any) => console.log(`Error pinging server: ${err}`));
}, 4 * 60 * 1000);

const unexpectedErrorHandler = (error: string) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
