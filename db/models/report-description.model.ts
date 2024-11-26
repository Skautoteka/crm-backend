import { DataTypes } from 'sequelize'
import {
    Column,
    ForeignKey,
    Table,
    Model,
    BelongsTo,
} from 'sequelize-typescript'
import Report from './report.model'

interface ReportDescriptionAttributes {
    reportId: string
    physicalDescription: string
    mentalDescription: string
    technicalDescription: string
}

@Table
export default class ReportDescription extends Model<ReportDescriptionAttributes> {
    @ForeignKey(() => Report)
    @Column({ allowNull: false, type: DataTypes.UUID })
    reportId: string

    @BelongsTo(() => Report)
    report: Report

    @Column({ allowNull: true, type: DataTypes.TEXT })
    physicalDescription: string

    @Column({ allowNull: true, type: DataTypes.TEXT })
    mentalDescription: string

    @Column({ allowNull: true, type: DataTypes.TEXT })
    technicalDescription: string
}
