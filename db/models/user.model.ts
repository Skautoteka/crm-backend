import { DataTypes, Optional } from 'sequelize'
import {
    BelongsTo,
    Column,
    DataType,
    Default,
    ForeignKey,
    HasMany,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript'
import Region from './region.model'
import Role from './role.model'
import Task from './task.model'

interface UserAttributes {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface UserCreationAttributes
    extends Optional<UserAttributes, 'id'> {}

@Table({
    timestamps: true,
})
export default class User extends Model<
    UserAttributes,
    UserCreationAttributes
> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataTypes.UUID })
    id: string

    @Column({ allowNull: false, type: DataTypes.TEXT })
    firstName: string

    @Column({ allowNull: false, type: DataTypes.TEXT })
    lastName: string

    @Column({ allowNull: false, unique: true, type: DataTypes.STRING(200) })
    email: string;

    @Column({ allowNull: false, type: DataTypes.STRING(64) })
    password: string;

    @ForeignKey(() => Region)
    @Column({ allowNull: true, type: DataTypes.UUID })
    regionId: string

    @BelongsTo(() => Region)
    region: Region

    @ForeignKey(() => Role)
    @Column({ type: DataTypes.UUID })
    roleId: string

    @BelongsTo(() => Role)
    role: Role

    @HasMany(() => Task)
    tasks: Task[]
}
