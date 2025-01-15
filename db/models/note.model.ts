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
    evaluation: number
    content: string
    playerNumber: number
    teamId: string
    createdById: string
}

export interface NoteCreationAttributes
    extends Optional<NoteAttributes, 'id'> {}

@Table({
    timestamps: true,
})
export default class Note extends Model<Note> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataTypes.UUID })
    id: string

    @Column({ type: DataTypes.TEXT })
    get name(): string {
        const number = this.getDataValue('playerNumber')
        const teamName = this.getDataValue('team')?.name

        if (!number && !teamName) {
            return 'Brak informacji'
        }

        return `#${number || ' Brak numeru'} - ${teamName || 'Brak zespołu'}`
    }

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
