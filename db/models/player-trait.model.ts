import { DataTypes, Optional } from 'sequelize';
import {
    BelongsToMany,
    Column,
    DataType,
    Default,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';
import ReportTrait from './report-trait.model';
import Report from './report.model';

interface PlayerTraitAttributes {
    id: string;
    name: string;
}

export interface PlayerTraitCreationAttributes
    extends Optional<PlayerTraitAttributes, 'id'> { }

@Table({
    timestamps: true,
})
export default class PlayerTrait extends Model<PlayerTrait> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataTypes.UUID })
    id: string;

    @Column({ allowNull: false, type: DataTypes.TEXT })
    name: string;

    @BelongsToMany(() => Report, () => ReportTrait)
    traits: Report[];
}
