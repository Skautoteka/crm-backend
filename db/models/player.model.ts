import { DataTypes, Optional } from 'sequelize'
import {
    BelongsTo,
    Column,
    DataType,
    Default,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript'
import Team from './team.model'
import Position from './position.model'

interface PlayerAttributes {
    id: string
    masterPlayerId: string | null
    version: number
    firstName: string
    lastName: string
    sex: string
    birthYear: number
    nationality: string
    positionId: string
    teamId: string | null
    height?: number
    weight?: number
    physique?: string
}

export interface PlayerCreationAttributes
    extends Optional<PlayerAttributes, 'id' | 'masterPlayerId' | 'version'> {}

@Table({
    timestamps: true,
})
export default class Player extends Model<
    PlayerAttributes,
    PlayerCreationAttributes
> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataTypes.UUID })
    id: string

    @ForeignKey(() => Player)
    @Column({ allowNull: true, type: DataTypes.UUID })
    masterPlayerId: string | null

    @Default(1)
    @Column({ allowNull: false, type: DataTypes.INTEGER })
    version: number

    @Column({ allowNull: false, type: DataTypes.TEXT })
    firstName: string

    @Column({ allowNull: false, type: DataTypes.TEXT })
    lastName: string

    @Column({ type: DataTypes.TEXT })
    get name(): string {
        return `${this.getDataValue('firstName')} ${this.getDataValue('lastName')}`
    }

    @Column({ allowNull: false, type: DataTypes.TEXT })
    sex: string

    @Column({ allowNull: true, type: DataTypes.TEXT })
    nationality: string

    @Column({ allowNull: true, type: DataTypes.INTEGER })
    birthYear: number

    @Column({ allowNull: true, type: DataTypes.INTEGER })
    height: number

    @Column({ allowNull: true, type: DataTypes.INTEGER })
    weight: number

    @Column({ allowNull: true, type: DataTypes.TEXT })
    physique: string

    @ForeignKey(() => Position)
    @Column({ allowNull: false, type: DataTypes.STRING(50) })
    positionId: string

    @BelongsTo(() => Position)
    position: Position

    @ForeignKey(() => Team)
    @Column({ allowNull: true, type: DataTypes.UUID })
    teamId: string

    @BelongsTo(() => Team)
    team: Team

    @Column({ type: DataTypes.TEXT })
    get searchQuery(): string | null {
        return `${this.getDataValue('firstName')} ${this.getDataValue('lastName')}`.toLowerCase()
    }
}
