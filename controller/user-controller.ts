import User from '../db/models/user.model'
// import { UserCreationAttributes } from '../db/models/user.model'
// import { ModelValidationError } from '../error/model-validation'
// import Player from '../db/models/player.model'
// import { NotFoundError } from '../error/not-found'

/**
 * Returns all users.
 *
 * @returns
 */
export const getAll = async (): Promise<User[]> => {
    const users = await User.findAll()
    return users
}
