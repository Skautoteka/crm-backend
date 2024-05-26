import { DataTypes } from "sequelize";
import { BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import User from "./user.model";

@Table({
  timestamps: true
})
export default class Report extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataTypes.UUID })
  id: string;

  @Column({ allowNull: false, type: DataTypes.TEXT })
  name: string;

  @ForeignKey(() => User)
  @Column
  userId: string;

  @BelongsTo(() => User)
  user: User;
}
