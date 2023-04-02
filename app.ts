import express from "express";
import * as dotenv from "dotenv";
import "express-async-errors";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";

import validateAuthentication from "./middlewares/auth.js";
import authRouter from "./routes/auth.js";
import jobsRouter from "./routes/jobs.js";
import getNotFoundPage from "./middlewares/page-not-found.js";
import handleErrors from "./middlewares/error-handler.js";
import connectDb from "./db/connect.js";

const swaggerDocument = YAML.load("./swagger.yaml");

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;

app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Jobs API</h1><a href='/api-docs'>Documentation</a>");
});
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", validateAuthentication, jobsRouter);
app.use(getNotFoundPage);
app.use(handleErrors);

async function start() {
  try {
    await connectDb(process.env.MONGO_URI!);
    app.listen(port, () =>
      console.log(`server is listening on port ${port}....`)
    );
  } catch (error) {
    console.log(error);
  }
}

start();
