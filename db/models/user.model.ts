import { DataTypes } from "sequelize";
import { BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import Region from "./region.model";

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

  @ForeignKey(() => Region)
  @Column({ allowNull: false, type: DataTypes.UUID })
  regionId: string;

  @BelongsTo(() => Region)
  region: Region;
}
