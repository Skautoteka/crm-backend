import { DataTypes, Optional } from 'sequelize'
import {
    Column,
    DataType,
    Default,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript'

interface PlayerTraitAttributes {
    id: string
    name: string
}

export interface PlayerTraitCreationAttributes
    extends Optional<PlayerTraitAttributes, 'id'> {}

@Table({
    timestamps: true,
})
export default class PlayerTrait extends Model<
    PlayerTraitAttributes,
    PlayerTraitCreationAttributes
> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataTypes.UUID })
    id: string

    @Column({ allowNull: false, type: DataTypes.TEXT })
    name: string
}
