import express from "express";
import {pinoHttp} from "pino-http";
import {linksRouter} from "./routes/links";


const app = express();
app.use(express.json());

const prod = process.env.NODE_ENV === "production";

const logger = pinoHttp({
  transport: prod ? undefined : {
    target: "pino-pretty",
    options: {
      colorize: true,
      singleLine: true,
      translateTime: "SYS:standard",
      ignore: "req.headers,res.headers",
    }
  }
})

app.use(logger);

app.get("/healthz", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/", linksRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});