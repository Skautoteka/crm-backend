import Role from '../db/models/role.model'
import { NotFoundError } from '../error/not-found'
import { Op } from 'sequelize'

/**
 * Gets basic role in the system.
 *
 * @returns
 */
export const getBasicRole = async (roleId: string): Promise<Role> => {
    const role = await Role.findOne({ where: { id: roleId } })

    if (!role) {
        throw new NotFoundError('Could not find the default role in the system')
    }

    return role
}

export const getAll = async () => {
    const roles = await Role.findAll({
        where: {
            name: {
                [Op.ne]: 'admin',
            },
        },
    })

    const userRoles = roles.map((role) => ({
        ...role.get(),
    }))

    return userRoles
}

/**
 * Queries roles based on the search query and the maximum
 * size.
 *
 * @returns
 */
export const queryRoles = async (
    search: string,
    size: number = 1
): Promise<Role[]> => {
    return await Role.findAll({
        where: { name: { [Op.substring]: search } },
        limit: size,
    })
}
