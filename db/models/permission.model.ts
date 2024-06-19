import {
    BelongsToMany,
    Table,
    Model,
    Column,
    DataType,
    PrimaryKey,
    Default,
} from 'sequelize-typescript'
import Role from './role.model'
import RolePermission from './role-permission.model'
import { DataTypes } from 'sequelize'

@Table
export default class Permission extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataTypes.UUID })
    id: string

    @Column({ type: DataTypes.TEXT })
    name: string

    @BelongsToMany(() => Role, () => RolePermission)
    roles: Role[]
}
