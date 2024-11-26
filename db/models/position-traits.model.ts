import { DataTypes, Optional } from 'sequelize'
import {
    Column,
    DataType,
    Default,
    Model,
    PrimaryKey,
    Table,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript'
import Position from './position.model'
import PlayerTrait from './player.model'

interface PositionTraitAttributes {
    id: string
    positionid: string
    playertraitid: string
}

export interface PositionTraitCreationAttributes
    extends Optional<PositionTraitAttributes, 'id'> {}

@Table({
    timestamps: true,
})
export default class PositionTrait extends Model<
    PositionTraitAttributes,
    PositionTraitCreationAttributes
> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataTypes.UUID })
    id: string

    @ForeignKey(() => Position)
    @Column({ allowNull: false, type: DataTypes.STRING(50) })
    positionId: string

    @BelongsTo(() => Position)
    position: Position

    @ForeignKey(() => PlayerTrait)
    @Column({ type: DataTypes.UUID, allowNull: false })
    playertraitid: string

    @BelongsTo(() => PlayerTrait)
    player_trait: PlayerTrait
}
