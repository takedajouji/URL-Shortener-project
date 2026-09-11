import express from "express";
import {linksRouter} from "./routes/links";

const app = express();

app.use(express.json());

app.get("/healthz", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/", linksRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});