import { Column, ForeignKey, Table, Model } from "sequelize-typescript";
import Role from "./role.model";
import Permission from "./permission.model";
import { DataTypes } from "sequelize";

@Table
export default class RolePermission extends Model {
  @ForeignKey(() => Role)
  @Column({ allowNull: true, type: DataTypes.UUID })
  roleId: string;

  @ForeignKey(() => Permission)
  @Column({ allowNull: true, type: DataTypes.UUID })
  permissionId: string;
}
