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
import Task from './task.model'
import User from './user.model'
import Team from './team.model'

interface NoteAttributes {
    id: string
    name: string
    status: 'IN_PROGRESS' | 'COMPLETED'
    taskId: string
    createdById: string
}

export interface NoteCreationAttributes
    extends Optional<NoteAttributes, 'id' | 'status'> {}

@Table({
    timestamps: true,
})
export default class Note extends Model<Note> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataTypes.UUID })
    id: string

    @Column({ allowNull: false, type: DataTypes.TEXT })
    name: string

    @Column({ allowNull: false, type: DataType.TEXT })
    status: 'IN_PROGRESS' | 'COMPLETED'

    @ForeignKey(() => Task)
    @Column({ allowNull: true, type: DataTypes.UUID })
    taskId: string

    @BelongsTo(() => Task)
    task: Task

    @Column({ allowNull: true, type: DataTypes.INTEGER })
    evaluation: number

    @Column({ allowNull: true, type: DataTypes.TEXT })
    content: string

    @Column({ allowNull: true, type: DataTypes.INTEGER })
    playerNumber: number

    @ForeignKey(() => Team)
    @Column({ allowNull: true, type: DataTypes.UUID })
    teamId: string

    @BelongsTo(() => Team)
    team: Team

    @ForeignKey(() => User)
    createdById: string

    @BelongsTo(() => User, { foreignKey: 'createdById' })
    createdBy: User
}
