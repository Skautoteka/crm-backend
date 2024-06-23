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
    status: 'in_progress' | 'finished'
}

export interface ReportCreationAttributes
    extends Optional<ReportAttributes, 'id' | 'status'> {}

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

    @Column({ allowNull: false, type: DataType.TEXT })
    status: 'in_progress' | 'finished'
}
