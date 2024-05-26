import { Column, ForeignKey, Table, Model } from "sequelize-typescript";
import Role from "./role.model";
import Permission from "./permission.model";

@Table
export default class RolePermission extends Model {
    @ForeignKey(() => Role)
    @Column
    roleId: string;

    @ForeignKey(() => Permission)
    @Column
    permissionId: string;
}