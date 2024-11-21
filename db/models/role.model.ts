import { DataTypes } from 'sequelize'
import {
    BelongsToMany,
    Column,
    HasMany,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript'
import User from './user.model'
import Permission from './permission.model'
import RolePermission from './role-permission.model'

@Table({
    timestamps: true,
})
export default class Role extends Model {
    @PrimaryKey
    @Column({ type: DataTypes.STRING(50) })
    id: string

    @Column({ type: DataTypes.TEXT })
    name: string

    @HasMany(() => User)
    user: User[]

    @BelongsToMany(() => Permission, () => RolePermission)
    permissions: Permission[]
}
