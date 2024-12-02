import { DataTypes } from 'sequelize'
import {
    Column,
    ForeignKey,
    Table,
    Model,
    BelongsTo,
} from 'sequelize-typescript'
import Report from './report.model'
import Team from './team.model'
import TeamFormation from './team-formation'

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

    @Column({ allowNull: true, type: DataTypes.INTEGER })
    evaluation: number

    @Column({ allowNull: true, type: DataTypes.TEXT })
    potential: string

    @Column({ allowNull: true, type: DataTypes.TEXT })
    physicalDescription: string

    @Column({ allowNull: true, type: DataTypes.TEXT })
    mentalDescription: string

    @Column({ allowNull: true, type: DataTypes.TEXT })
    technicalDescription: string

    @ForeignKey(() => Team)
    @Column({ allowNull: true, type: DataTypes.UUID })
    opponentId: string

    @BelongsTo(() => Team)
    team: Team

    @ForeignKey(() => TeamFormation)
    @Column({ allowNull: true, type: DataTypes.UUID })
    formationId: string

    @BelongsTo(() => TeamFormation)
    formation: TeamFormation

    @Column({ allowNull: true, type: DataTypes.INTEGER })
    timePlayed: number

    @Column({ allowNull: true, type: DataTypes.INTEGER })
    goalsScored: number

    @Column({ allowNull: true, type: DataTypes.INTEGER })
    assists: number

    @Column({ allowNull: true, type: DataTypes.TEXT })
    summary: number
}
