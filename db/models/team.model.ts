import { DataTypes, Optional } from 'sequelize'
import {
    Column,
    DataType,
    Default,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript'

interface TeamAttributes {
    id: string
    name: string
    city: string
    country: string
    league: string
}

export interface TeamCreationAttributes
    extends Optional<TeamAttributes, 'id'> {}

@Table({
    timestamps: true,
})
export default class Team extends Model<
    TeamAttributes,
    TeamCreationAttributes
> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataTypes.UUID })
    id: string

    @Column({ allowNull: false, type: DataTypes.TEXT })
    name: string

    @Column({ allowNull: true, type: DataTypes.TEXT })
    league: string

    @Column({ allowNull: true, type: DataTypes.TEXT })
    city: string

    @Column({ allowNull: true, type: DataTypes.TEXT })
    country: string
}
