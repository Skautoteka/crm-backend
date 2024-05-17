import { Sequelize } from "sequelize";

const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "mysql",
});

try {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
} catch {
  throw new Error("Could not connect to the database");
}

export { sequelize };
