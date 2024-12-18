import { DataTypes, Optional } from 'sequelize'
import {
    Column,
    DataType,
    Default,
    HasMany,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript'
import User from './user.model'

interface RegionAttributes {
    id: string
    name: string
}

export interface RegionCreationAttributes
    extends Optional<RegionAttributes, 'id'> {}

@Table({
    timestamps: true,
})
export default class Region extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataTypes.UUID })
    id: string

    @Column({ allowNull: false, type: DataTypes.TEXT })
    name: string

    @HasMany(() => User)
    user: User[]
}
