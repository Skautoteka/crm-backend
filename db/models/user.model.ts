import { DataTypes } from "sequelize";
import { Column, DataType, Default, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  timestamps: true,
})
export default class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataTypes.UUID })
  id: string;

  @Column({ allowNull: false, type: DataTypes.TEXT })
  firstName: string;

  @Column({ allowNull: false, type: DataTypes.TEXT })
  lastName: string;
}
