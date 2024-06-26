import { Op } from 'sequelize'
import Team from '../db/models/team.model'
import { TeamCreationAttributes } from '../db/models/team.model'
import { InvalidPayloadError } from '../error/invalid-payload'
import { ModelValidationError } from '../error/model-validation'
import { ISingleInputConfig } from '../interface'

/**
 * Returns the model for the team creation.
 *
 * @returns
 */
export const getTeamCreateFields = async (): Promise<ISingleInputConfig[]> => {
    return [
        {
            name: 'name',
            isRequired: true,
            label: 'Nazwa drużyny',
            placeholder: 'Wpisz nazwę drużyny',
            type: 'TEXT',
        },
        {
            name: 'city',
            isRequired: false,
            label: 'Miejscowość',
            placeholder: 'Wpisz nazwę miejscowości',
            type: 'TEXT',
        },
        {
            name: 'country',
            isRequired: false,
            label: 'Kraj',
            placeholder: 'Wpisz kraj',
            type: 'TEXT',
        },
        {
            name: 'league',
            isRequired: false,
            label: 'Liga',
            placeholder: 'Wpisz ligę',
            type: 'TEXT',
        },
    ]
}

/**
 * Queries teams based on the search query and the maximum
 * size.
 *
 * @returns
 */
export const queryTeams = async (
    search: string,
    size: number = 1
): Promise<Team[]> => {
    return await Team.findAll({
        where: { name: { [Op.substring]: search } },
        limit: size,
    })
}

/**
 * Removes a team from a database.
 *
 * @param id
 * @returns
 */
export const remove = async (id: string): Promise<void> => {
    const task = await Team.findOne({ where: { id } })

    if (task) {
        return await task.destroy()
    }
}

/**
 * Adds a new team to the system.
 *
 * @param param0
 * @returns
 */
export const add = async ({
    name,
    city,
    country,
    league,
}: TeamCreationAttributes): Promise<Team> => {
    if (!name) {
        throw new InvalidPayloadError('No name was provided')
    }

    try {
        const team = new Team({ name, city, country, league })
        return await team.save()
    } catch (err) {
        throw new ModelValidationError(err.message)
    }
}

/**
 * Returns all teams.
 */
export const getAll = async (): Promise<Team[]> => {
    return await Team.findAll()
}
