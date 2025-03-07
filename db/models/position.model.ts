import { DataTypes, Optional } from 'sequelize'
import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript'

interface PositionAttributes {
    id: string
    name: string
}

export interface PositionCreationAttributes
    extends Optional<PositionAttributes, 'id'> {}

@Table({
    timestamps: true,
})
export default class Position extends Model<
    PositionAttributes,
    PositionCreationAttributes
> {
    @PrimaryKey
    @Column({ type: DataTypes.STRING(50), allowNull: false, unique: true })
    id: string

    @Column({ allowNull: false, type: DataTypes.TEXT })
    name: string
}
