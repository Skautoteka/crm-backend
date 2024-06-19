import { Op } from 'sequelize'
import Team from '../db/models/team.model'
import { TeamCreationAttributes } from '../db/models/team.model'
import { InvalidPayloadError } from '../error/invalid-payload'
import { ModelValidationError } from '../error/model-validation'

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
 * Added removing endpoint for the team.
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
}: TeamCreationAttributes): Promise<Team> => {
    if (!name) {
        throw new InvalidPayloadError('No name was provided')
    }

    try {
        const team = new Team({ name, city, country })
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
