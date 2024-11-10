import { Op } from 'sequelize'
import Player, { PlayerCreationAttributes } from '../db/models/player.model'
import Team from '../db/models/team.model'
import { ModelValidationError } from '../error/model-validation'
import { NotFoundError } from '../error/not-found'
import { ISingleInputConfig } from '../interface'

/**
 * Returns all players.
 */
export const getAll = async (): Promise<Player[]> => {
    return await Player.findAll({ include: Team })
}

/**
 * Adds a new task.
 *
 * @param param0
 * @returns
 */
export const add = async (
    payload: PlayerCreationAttributes
): Promise<Player> => {
    try {
        const { id } = await new Player(payload).save()
        const added = await Player.findByPk(id, { include: Team })

        if (!added) {
            throw new NotFoundError('Could not find added player.')
        }

        return added
    } catch (err) {
        throw new ModelValidationError(err.message)
    }
}

/**
 * Queries players based on the search query and the maximum
 * size.
 *
 * @returns
 */
export const queryPlayer = async (
    search: string,
    size: number = 1
): Promise<Player[]> => {
    return await Player.findAll({
        where: {
            [Op.or]: [
                { firstName: { [Op.like]: `%${search}%` } },
                { lastName: { [Op.like]: `%${search}%` } },
            ],
        },
        limit: size,
    })
}

/**
 * Removes the player from the database.
 *
 * @param id
 */
export const remove = async (id: string): Promise<void> => {
    const player = await Player.findOne({ where: { id } })

    if (player) {
        return await player.destroy()
    }
}

/**
 * Gets the model for the player model creation.
 *
 * @returns
 */
export const getTaskCreateFields = async (): Promise<ISingleInputConfig[]> => {
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
            name: 'sex',
            label: 'Płeć zawodnika',
            isRequired: true,
            placeholder: 'Wpisz płeć',
            type: 'SELECT',
            options: [
                { value: 'MALE', label: 'Mezczyzna' },
                { value: 'FEMALE', label: 'Kobieta' },
            ],
        },
        {
            name: 'position',
            label: 'Pozycja zawodnika',
            isRequired: true,
            placeholder: 'Wybierz pozycje',
            type: 'SELECT',
            options: [
                { value: 'FORWARD', label: 'Napastnik' },
                { value: 'DEFENSE', label: 'Obrońca' },
                { value: 'WINGER', label: 'Skrzydłowy' },
            ],
        },
        {
            name: 'teamId',
            label: 'Drużyna zawodnika',
            isRequired: false,
            placeholder: 'Wyszukaj druzyne zawodnika',
            type: 'SEARCH',
            searchType: 'team',
        },
        {
            name: 'age',
            label: 'Wiek',
            isRequired: true,
            placeholder: 'Wpisz wiek zawodnika',
            type: 'NUMBER',
        },
    ]
}
