import { Op } from 'sequelize'
import Team from '../db/models/team.model'

/**
 * Queries teams based on the search query and the maximum
 * size.
 *
 * @returns
 */
export const queryTeams = async (
    size: number,
    search: string
): Promise<Team[]> => {
    return await Team.findAll({
        where: { name: { [Op.substring]: search } },
    })
}
