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
import Team from './team.model'

interface TaskAttributes {
    id: string
    status: string
    createdById: string
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

    @Column({ allowNull: true, type: DataTypes.BOOLEAN })
    type: boolean

    @Column({ allowNull: true, type: DataTypes.TEXT })
    location: string

    @Column({ allowNull: true, type: DataTypes.DATE })
    startDate: string

    @ForeignKey(() => Team)
    hostTeamId: string

    @BelongsTo(() => Team, { foreignKey: 'hostTeamId' })
    hostTeam: Team

    @ForeignKey(() => Team)
    guestTeamId: string

    @BelongsTo(() => Team, { foreignKey: 'guestTeamId' })
    guestTeam: Team

    @ForeignKey(() => User)
    @Column({ allowNull: true, type: DataTypes.UUID })
    assignedToId: string

    @BelongsTo(() => User)
    assignedTo: User

    @ForeignKey(() => User)
    createdById: string

    @BelongsTo(() => User, { foreignKey: 'createdById' })
    createdBy: User
}
