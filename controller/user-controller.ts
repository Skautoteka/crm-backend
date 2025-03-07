import { ISingleInputConfig } from '../interface'
import User from '../db/models/user.model'
import Role from '../db/models/role.model'
import Region from '../db/models/region.model'
import { Op } from 'sequelize'
import * as authController from './auth-controller'
import { Request } from 'express'
import { UnauthorizedError } from '../error/unauthorized'
import { InvalidPayloadError } from '../error/invalid-payload'

export const getAll = async () => {
    const users = await User.findAll({
        include: [
            {
                model: Role,
                attributes: ['name'],
            },
            {
                model: Region,
                attributes: ['name'],
            },
        ],
    })

    return users.map((user) => ({
        ...user.get(),
        role: user.role?.name,
        region: user.region?.name,
    }))
}

/**
 * Queries users based on the search query and the maximum
 * size.
 *
 * @returns
 */
export const queryUsers = async (
    search: string,
    size: number = 1
): Promise<User[]> => {
    return await User.findAll({
        where: {
            [Op.or]: [
                { firstName: { [Op.substring]: search } },
                { lastName: { [Op.substring]: search } },
            ],
        },
        limit: size,
    })
}

/**
 * Changes user password
 *
 * @param current
 * @param newPassword
 * @param confirmPassword
 */
export const changePassword = async (
    req: Request,
    current: string,
    newPassword: string,
    confirmPassword: string
): Promise<void> => {
    const user = await authController.getReqUser(req)

    if (newPassword !== confirmPassword) {
        throw new InvalidPayloadError('Passwords are not equal')
    }

    if (!user) {
        throw new UnauthorizedError('Cannnot change password. Unauthorized')
    }

    await authController.changePassword(user, current, newPassword)
}

/**
 * Removes a user from a database.
 *
 * @param id
 * @returns
 */
export const remove = async (id: string): Promise<void> => {
    const user = await User.findOne({ where: { id } })

    if (user) {
        return await user.destroy()
    }
}

/**
 * Gets the model for the user model creation.
 *
 * @returns
 */
export const getUserCreateFields = async (): Promise<ISingleInputConfig[]> => {
    return [
        {
            name: 'firstName',
            label: 'Imię',
            isRequired: true,
            placeholder: 'Wpisz imię',
            type: 'TEXT',
        },
        {
            name: 'lastName',
            label: 'Nazwisko',
            isRequired: true,
            placeholder: 'Wpisz nazwisko',
            type: 'TEXT',
        },
        {
            name: 'email',
            label: 'Adres email',
            isRequired: true,
            placeholder: 'Wpisz adres email',
            type: 'TEXT',
        },
        {
            name: 'role',
            label: 'Rola',
            isRequired: true,
            placeholder: 'Wybierz role użytkownika',
            type: 'DB',
            searchType: 'role',
        },
        {
            name: 'phoneNumber',
            label: 'Numer telefonu',
            isRequired: false,
            placeholder: 'Wpisz numer telefonu',
            type: 'TEXT',
        },
        {
            name: 'region',
            label: 'Region',
            isRequired: false,
            placeholder: 'Wyszukaj region',
            type: 'SEARCH',
            searchType: 'region',
        },
    ]
}
