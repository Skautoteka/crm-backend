import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../sequelize";

interface User {
  firstName: string;
  lastName: string;
}

const User = (sequelize: Sequelize) => {
  sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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
};
