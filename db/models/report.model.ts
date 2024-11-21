import { DataTypes, Optional } from 'sequelize'
import {
    BelongsTo,
    BelongsToMany,
    Column,
    DataType,
    Default,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript'
import Player from './player.model'
import User from './user.model'
import PlayerTrait from './player-trait.model'
import ReportTrait from './report-trait.model'
import Region from './region.model'

interface ReportAttributes {
    id: string
    name: string
    status: 'IN_PROGRESS' | 'COMPLETED'
    createdById: string
}

export interface ReportCreationAttributes
    extends Optional<ReportAttributes, 'id' | 'status'> {}

@Table({
    timestamps: true,
})
export default class Report extends Model<Report> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataTypes.UUID })
    id: string

    @Column({ allowNull: false, type: DataTypes.TEXT })
    name: string

    @Column({ allowNull: false, type: DataType.TEXT })
    status: 'IN_PROGRESS' | 'COMPLETED'

    @ForeignKey(() => Player)
    playerId: string

    @BelongsTo(() => Player, { foreignKey: 'playerId' })
    player: Player

    @ForeignKey(() => Region)
    regionId: string

    @BelongsTo(() => Region, { foreignKey: 'regionId' })
    region: Region

    @ForeignKey(() => User)
    createdById: string

    @BelongsTo(() => User, { foreignKey: 'createdById' })
    createdBy: User

    @BelongsToMany(() => PlayerTrait, () => ReportTrait)
    traits: PlayerTrait[]
}
