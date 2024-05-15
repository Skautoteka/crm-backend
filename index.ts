import dotenv from "dotenv";
import express from "express";
import { json } from "body-parser";

dotenv.config();

const app = express();
app.use(json());

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
