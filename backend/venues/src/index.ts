import { config } from "dotenv";
import express from "express";
import expressPinoLogger from "express-pino-logger";
import { errors } from "graphql-response-parser";
import find from "./find";
import log from "./utils/log";

config();

export const hostname = process.env.HOST || "localhost";
export const port = +(process.env.PORT || 4e3 + 6);

const app = express();

app
  .use(expressPinoLogger({ logger: log }))
  .get("/", find);

app
  .use((e, req, res, next) => {
    const { message } = errors(e);
    res.status(400).json({ message });
  });

app
  .listen(port, hostname, () => log.info(`>>> 🌎 Open ${hostname}:${port} in your browser.`));
