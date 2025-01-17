import { DataTypes, Optional } from 'sequelize'
import {
    BelongsTo,
    // BelongsToMany,
    Column,
    DataType,
    Default,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
    HasMany,
    HasOne,
} from 'sequelize-typescript'
import Player from './player.model'
import Task from './task.model'
import User from './user.model'
// import PlayerTrait from './player-trait.model'
import ReportTrait from './report-trait.model'
import Region from './region.model'
import ReportPosition from './report-position.model'
import ReportDescription from './report-description.model'

interface ReportAttributes {
    id: string
    name: string
    status: 'IN_PROGRESS' | 'COMPLETED'
    playerId: string
    taskId: string
    regionId: string
    traits: ReportTrait[]
    positions: ReportPosition[]
    description: ReportDescription
    createdById: string
}

export interface ReportCreationAttributes
    extends Optional<ReportAttributes, 'id'> {}

@Table({
    timestamps: true,
})
export default class Report extends Model<Report> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataTypes.UUID })
    id: string

    @Column({ type: DataTypes.TEXT })
    get name(): string {
        const player = this.getDataValue('player')

        if (!player) {
            return 'Bez nazwy'
        }

        return `${player.name}`
    }

    @Column({ allowNull: false, type: DataType.TEXT })
    status: 'IN_PROGRESS' | 'COMPLETED'

    @ForeignKey(() => Player)
    playerId: string

    @BelongsTo(() => Player, { foreignKey: 'playerId' })
    player: Player

    @ForeignKey(() => Task)
    @Column({ allowNull: true, type: DataTypes.UUID })
    taskId: string | null

    @BelongsTo(() => Task)
    task: Task
    @ForeignKey(() => Region)
    regionId: string

    @BelongsTo(() => Region, { foreignKey: 'regionId' })
    region: Region

    @ForeignKey(() => User)
    createdById: string

    @BelongsTo(() => User, { foreignKey: 'createdById' })
    createdBy: User

    @HasMany(() => ReportTrait)
    traits: ReportTrait[]

    @HasMany(() => ReportPosition)
    positions: ReportPosition[]

    @HasOne(() => ReportDescription)
    description: ReportDescription
}
