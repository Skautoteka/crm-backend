import { Optional } from 'sequelize'
import {
    Model,
    Table,
} from 'sequelize-typescript'

interface TeamAttributes {
    id: string
    name: string
}

export interface TeamCreationAttributes
    extends Optional<TeamAttributes, 'id'> {}

@Table({
    timestamps: true,
})
export default class Team extends Model<
    TeamAttributes,
    TeamCreationAttributes
> {
}
