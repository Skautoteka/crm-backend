import { Op } from 'sequelize'
import Position, {
    PositionCreationAttributes,
} from '../db/models/position.model'
import { ModelValidationError } from '../error/model-validation'
import { NotFoundError } from '../error/not-found'

/**
 * Queries positions based on the search query and the maximum
 * size.
 *
 * @returns
 */
export const queryPositions = async (
    search: string,
    size: number = 1
): Promise<Position[]> => {
    return await Position.findAll({
        where: { name: { [Op.substring]: search } },
        limit: size,
    })
}

/**
 * Returns all positions.
 */
export const getAll = async (): Promise<Position[]> => {
    return await Position.findAll()
}

/**
 * Adds a new position.
 *
 * @param payload
 * @returns
 */
export const addPosition = async (
    payload: PositionCreationAttributes
): Promise<Position> => {
    try {
        const position = await new Position(payload).save()
        const addedPosition = await Position.findByPk(position.id)

        if (!addedPosition) {
            throw new NotFoundError('Could not find added position position.')
        }

        return addedPosition
    } catch (err) {
        throw new ModelValidationError(err.message)
    }
}

/**
 * Removes position.
 *
 * @param id
 */
export const removePosition = async (id: string): Promise<void> => {
    const position = await Position.findOne({ where: { id } })

    if (position) {
        await position.destroy()
    } else {
        throw new NotFoundError('Position position not found.')
    }
}

/**
 *  Gets the model.
 *
 * @returns
 */
export const getPositionCreateFields = async () => {
    return [
        {
            name: 'name',
            label: 'Nazwa pozycji',
            isRequired: true,
            placeholder: 'Wpisz nazwę cechy',
            type: 'TEXT',
        },
    ]
}
