import { DataTypes } from 'sequelize'
import {
    Column,
    ForeignKey,
    Table,
    Model,
    BelongsTo,
} from 'sequelize-typescript'
import Position from './position.model'
import Report from './report.model'

interface ReportPositionAttributes {
    reportId: string
    positionId: string
    isOptional: boolean
}

@Table
export default class ReportPosition extends Model<ReportPositionAttributes> {
    @ForeignKey(() => Report)
    @Column({ allowNull: false, type: DataTypes.UUID })
    reportId: string

    @BelongsTo(() => Report)
    report: Report

    @ForeignKey(() => Position)
    @Column({ allowNull: false, type: DataTypes.STRING(50) })
    positionId: string

    @BelongsTo(() => Position)
    position: Position

    @Column({ allowNull: true, type: DataTypes.BOOLEAN })
    isOptional: boolean
}
