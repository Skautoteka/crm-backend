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
import User from './user.model'

interface TaskAttributes {
    id: string;
    status: string;
}

export interface TaskCreationAttributes
    extends Optional<TaskAttributes, 'id'> {}

@Table({
    timestamps: true,
})
export default class Task extends Model<
    TaskAttributes,
    TaskCreationAttributes
> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataTypes.UUID })
    id: string

    @Column({ allowNull: true, type: DataTypes.TEXT })
    status: string

    @Column({ allowNull: true, type: DataTypes.TEXT })
    type: string

    @Column({ allowNull: true, type: DataTypes.TEXT })
    hostTeam: string

    @Column({ allowNull: true, type: DataTypes.TEXT })
    guestTeam: string

    @Column({ allowNull: true, type: DataTypes.TEXT })
    location: string

    @Column({ allowNull: true, type: DataTypes.DATE })
    startDate: string

    @ForeignKey(() => User)
    @Column({ allowNull: true, type: DataTypes.UUID })
    userId: string

    @BelongsTo(() => User)
    user: User
}
