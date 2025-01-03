import { Op } from 'sequelize'
import TeamFormation from '../db/models/team-formation'

/**
 * Queries team formations based on the search query and the maximum
 * size.
 *
 * @returns
 */
export const queryTeamFormation = async (
    search: string,
    size: number = 1
): Promise<TeamFormation[]> => {
    return await TeamFormation.findAll({
        where: { name: { [Op.substring]: search } },
        limit: size,
    })
}

/**
 * Returns all team formations.
 */
export const getAll = async (): Promise<TeamFormation[]> => {
    return await TeamFormation.findAll()
}
