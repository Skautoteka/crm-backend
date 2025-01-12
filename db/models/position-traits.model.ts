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
import PlayerTrait from './player-trait.model'

interface PositionTraitAttributes {
    id: string
    positionId: string
    playerTraitId: string
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
    @Column({ type: DataTypes.STRING(50), allowNull: false })
    positionId: string

    @BelongsTo(() => Position)
    position: Position

    @ForeignKey(() => PlayerTrait)
    @Column({ type: DataTypes.STRING(50), allowNull: false })
    playerTraitId: string

    @BelongsTo(() => PlayerTrait)
    playertrait: PlayerTrait
}
