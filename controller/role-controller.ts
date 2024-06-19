import Role from '../db/models/role.model'
import { NotFoundError } from '../error/not-found'

/**
 * Gets basic role in the system.
 *
 * @returns
 */
export const getBasicRole = async (): Promise<Role> => {
    const role = await Role.findOne({ where: { name: 'scout' } })

    if (!role) {
        throw new NotFoundError('Could not find the default role in the system')
    }

    return role
}
