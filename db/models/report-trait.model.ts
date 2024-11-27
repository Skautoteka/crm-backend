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

@Table
export default class ReportTrait extends Model<ReportTrait> {
    @ForeignKey(() => PlayerTrait)
    @Column({ type: DataType.STRING(50), allowNull: false, unique: true })
    traitId: string

    @BelongsTo(() => PlayerTrait)
    trait: PlayerTrait

    @ForeignKey(() => Report)
    @Column({ type: DataType.UUID })
    reportId: string

    @BelongsTo(() => Report)
    report: Report

    @Column({ allowNull: false, type: DataType.INTEGER })
    value: number
}
