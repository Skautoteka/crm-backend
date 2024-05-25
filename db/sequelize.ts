import { Sequelize } from "sequelize";
import { createModel } from "./models/user";

export const sequelize = new Sequelize("skautoteka", "root", "t4jn3h4slo", {
  host: "localhost",
  dialect: "mysql",
});

createModel();

// export const initializeDB = async (): Promise<void> => {
//   try {
//     await sequelize.authenticate();
//     User.build({ firstName: "Damian", lastName: "Kowalski" });
//     await sequelize.sync({ alter: true, force: true });
//   } catch {
//     throw new Error("Could not connect to the database");
//   }
// };
