import { ISingleInputConfig } from '../interface'
import User from '../db/models/user.model'
import Role from '../db/models/role.model'
import Region from '../db/models/region.model'

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
            type: 'SELECT',
            options: [
                { label: 'Skaut', value: 'Skaut' },
                { label: 'Menadżer regionu', value: 'Menadżer regionu' },
                { label: 'Analityk', value: 'Analityk' },
            ],
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
