import {
    Column,
    ForeignKey,
    Table,
    Model,
    DataType,
    BelongsTo,
} from 'sequelize-typescript'
import PlayerTrait from './player-trait.model'
import Report from './report.model'

interface ReportTraitAttributes {
    traitId: string
    reportId: string
    value: number | null
}

export interface ReportTraitCreationAttributes extends ReportTraitAttributes {}

@Table
export default class ReportTrait extends Model<ReportTrait> {
    @ForeignKey(() => PlayerTrait)
    @Column({ type: DataType.STRING(50), allowNull: false })
    traitId: string

    @BelongsTo(() => PlayerTrait)
    trait: PlayerTrait

    @ForeignKey(() => Report)
    @Column({ type: DataType.UUID, allowNull: false })
    reportId: string

    @BelongsTo(() => Report)
    report: Report

    @Column({ type: DataType.INTEGER, allowNull: true })
    value: number
}
