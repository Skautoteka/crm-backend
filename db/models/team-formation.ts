import { DataTypes } from 'sequelize'
import {
    Column,
    Table,
    Model,
    PrimaryKey,
    DataType,
    Default,
} from 'sequelize-typescript'

interface TeamFormationAttributes {
    id: string
    formation: string
}

@Table
export default class TeamFormation extends Model<TeamFormationAttributes> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataTypes.UUID })
    id: string

    @Column({ allowNull: false, type: DataTypes.TEXT })
    name: string
}
