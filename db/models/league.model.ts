import { DataTypes, Optional } from 'sequelize';
import {
    Column,
    DataType,
    Default,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';

interface LeagueAttributes {
    id: string;
    name: string;
    country: string;
}

export interface LeagueCreationAttributes extends Optional<LeagueAttributes, 'id'> { }

@Table({
    timestamps: true,
})
export default class League extends Model<LeagueAttributes, LeagueCreationAttributes> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataTypes.UUID })
    id: string;

    @Column({ allowNull: false, type: DataTypes.STRING })
    name: string;

    @Column({ allowNull: false, type: DataTypes.STRING })
    country: string;
}