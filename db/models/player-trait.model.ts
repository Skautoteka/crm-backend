import { DataTypes, Optional } from 'sequelize'
import {
    BelongsToMany,
    Column,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript'
import ReportTrait from './report-trait.model'
import Report from './report.model'

interface PlayerTraitAttributes {
    id: string
    name: string
}

export interface PlayerTraitCreationAttributes
    extends Optional<PlayerTraitAttributes, 'id'> {}

@Table({
    timestamps: true,
})
export default class PlayerTrait extends Model<PlayerTrait> {
    @PrimaryKey
    @Column({ type: DataTypes.STRING(50), allowNull: false, unique: true })
    id: string

    @Column({ allowNull: false, type: DataTypes.TEXT })
    name: string

    @BelongsToMany(() => Report, () => ReportTrait)
    traits: Report[]
}
