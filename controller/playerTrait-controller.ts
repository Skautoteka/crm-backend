import PlayerTrait, {
    PlayerTraitCreationAttributes,
} from '../db/models/playerTrait.model'
import { ModelValidationError } from '../error/model-validation'
import { NotFoundError } from '../error/not-found'

/**
 * Returns all traits.
 */
export const getAllTraits = async (): Promise<PlayerTrait[]> => {
    return await PlayerTrait.findAll()
}

/**
 * Adds a new trait.
 *
 * @param payload
 * @returns
 */
export const addTrait = async (
    payload: PlayerTraitCreationAttributes
): Promise<PlayerTrait> => {
    try {
        const trait = await new PlayerTrait(payload).save()
        const addedTrait = await PlayerTrait.findByPk(trait.id)

        if (!addedTrait) {
            throw new NotFoundError('Could not find added player trait.')
        }

        return addedTrait
    } catch (err) {
        throw new ModelValidationError(err.message)
    }
}

/**
 * Removes trait.
 *
 * @param id
 */
export const removeTrait = async (id: string): Promise<void> => {
    const trait = await PlayerTrait.findOne({ where: { id } })

    if (trait) {
        await trait.destroy()
    } else {
        throw new NotFoundError('Player trait not found.')
    }
}

/**
 *  Gets the model.
 *
 * @returns
 */
export const getTraitCreateFields = async () => {
    return [
        {
            name: 'name',
            label: 'Nazwa cechy',
            isRequired: true,
            placeholder: 'Wpisz nazwę cechy',
            type: 'TEXT',
        },
    ]
}
