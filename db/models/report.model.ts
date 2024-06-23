import { DataTypes, Optional } from 'sequelize'
import {
    Column,
    DataType,
    Default,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript'

interface ReportAttributes {
    id: string
    name: string
}

export interface ReportCreationAttributes
    extends Optional<ReportAttributes, 'id'> {}

@Table({
    timestamps: true,
})
export default class Report extends Model<
    ReportAttributes,
    ReportCreationAttributes
> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataTypes.UUID })
    id: string

    @Column({ allowNull: false, type: DataTypes.TEXT })
    name: string
}
