import { Sequelize } from "sequelize-typescript";

export const sequelize = new Sequelize({
  database: "skautoteka",
  dialect: "mysql",
  username: "root",
  password: "t4jn3h4slo",
  models: [__dirname + "/models"],
});
