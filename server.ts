import dotenv from "dotenv";
import express from "express";
import { json } from "body-parser";
import { sequelize } from "./db/sequelize";
import { errorHandler } from "./middleware/error-middleware";

dotenv.config();

const app = express();
app.use(json({ limit: "5mb" }));

const port = process.env.PORT;
(async () => {
  await sequelize.sync({ force: true });

  app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
})();

app.use(errorHandler);
