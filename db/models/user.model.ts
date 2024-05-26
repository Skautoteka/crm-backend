import { DataTypes, Optional } from "sequelize";
import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import Region from "./region.model";
import Role from "./role.model";
import Report from "./report.model";

interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
}

export interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

@Table({
  timestamps: true,
})
export default class User extends Model<UserAttributes, UserCreationAttributes> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataTypes.UUID })
  id: string;

  @Column({ allowNull: false, type: DataTypes.TEXT })
  firstName: string;

  @Column({ allowNull: false, type: DataTypes.TEXT })
  lastName: string;

  @ForeignKey(() => Region)
  @Column({ allowNull: true, type: DataTypes.UUID })
  regionId: string;

  @BelongsTo(() => Region)
  region: Region;

  @ForeignKey(() => Role)
  @Column({ allowNull: false, type: DataTypes.UUID })
  roleId: string;

  @BelongsTo(() => Role)
  role: Role;

  @HasMany(() => Report)
  reports: Report[];
}
