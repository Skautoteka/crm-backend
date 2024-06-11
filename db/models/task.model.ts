import { DataTypes } from "sequelize";
import { BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import User from "./user.model";

@Table({
  timestamps: true,
})
export default class Task extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataTypes.UUID })
  id: string;

  @Column({ allowNull: false, type: DataTypes.TEXT })
  status: string;

  @Column({ allowNull: false, type: DataTypes.TEXT })
  type: string;

  @Column({ allowNull: false, type: DataTypes.TEXT })
  hostTeam: string;

  @Column({ allowNull: false, type: DataTypes.TEXT })
  guestTeam: string;

  @Column({ allowNull: false, type: DataTypes.TEXT })
  location: string;

  @Column({ allowNull: false, type: DataTypes.DATE })
  startDate: string;

  @ForeignKey(() => User)
  @Column({ allowNull: true, type: DataTypes.UUID })
  userId: string;

  @BelongsTo(() => User)
  user: User;
}
