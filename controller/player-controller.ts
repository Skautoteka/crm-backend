import Player, { PlayerCreationAttributes } from "../db/models/player.model"
import { ModelValidationError } from "../error/model-validation"
import { ISingleInputConfig } from "../interface"

/**
 * Returns all players.
 */
export const getAll = async (): Promise<Player[]> => {
    return await Player.findAll()
}

/**
 * Adds a new task.
 *
 * @param param0
 * @returns
 */
export const add = async ({ firstName, lastName, age, sex }: PlayerCreationAttributes): Promise<Player> => {
    try {
        const player = new Player({ firstName, lastName, age, sex })
        return await player.save()
    } catch (err) {
        throw new ModelValidationError(err.message)
    }
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
                { value: 'FEMALE', label: 'Kobieta' }
            ]
        },
        {
            name: 'age',
            label: 'Wiek',
            isRequired: true,
            placeholder: 'Wpisz wiek zawodnika',
            type: 'NUMBER',
        }
    ]
}