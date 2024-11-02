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
            name: 'rola',
            label: 'Rola',
            isRequired: true,
            placeholder: 'Wybierz role użytkownika',
            type: 'SELECT',
            options: [
                { label: 'Skaut', value: 'scout' },
                { label: 'Menadżer regionu', value: 'manager' },
                { label: 'Analityk', value: 'analyst' },
            ],
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
