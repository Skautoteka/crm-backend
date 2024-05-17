import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";

interface User {
  firstName: string;
  lastName: string;
}

export const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const user = User.build({ firstName: "Damian", lastName: "Kowalski" });
