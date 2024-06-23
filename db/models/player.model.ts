import { DataTypes, Optional } from 'sequelize'
import {
    Column,
    DataType,
    Default,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript'

interface PlayerAttributes {
    id: string
    firstName: string
    lastName: string
    sex: string
    age: number
}

export interface PlayerCreationAttributes
    extends Optional<PlayerAttributes, 'id'> {}

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

    @Column({ allowNull: false, type: DataTypes.TEXT })
    firstName: string

    @Column({ allowNull: false, type: DataTypes.TEXT })
    lastName: string;

    @Column({ allowNull: false, type: DataTypes.TEXT })
    sex: string;

    @Column({ allowNull: false, type: DataTypes.INTEGER })
    age: number;
}
