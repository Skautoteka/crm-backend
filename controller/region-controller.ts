import { Op } from 'sequelize'
import Region from '../db/models/region.model'
import { RegionCreationAttributes } from '../db/models/region.model'
import { InvalidPayloadError } from '../error/invalid-payload'
import { ModelValidationError } from '../error/model-validation'

/**
 * Queries regions based on the search query and the maximum
 * size.
 *
 * @returns
 */
export const queryRegions = async (
    search: string,
    size: number = 1
): Promise<Region[]> => {
    return await Region.findAll({
        where: { name: { [Op.substring]: search } },
        limit: size,
    })
}

/**
 * Removes a region from a database.
 *
 * @param id
 * @returns
 */
export const remove = async (id: string): Promise<void> => {
    const region = await Region.findOne({ where: { id } })

    if (region) {
        return await region.destroy()
    }
}

/**
 * Adds a new region to the system.
 *
 * @param param0
 * @returns
 */
export const add = async ({
    name,
}: RegionCreationAttributes): Promise<Region> => {
    if (!name) {
        throw new InvalidPayloadError('No name was provided')
    }

    try {
        const region = new Region({ name })
        return await region.save()
    } catch (err) {
        throw new ModelValidationError(err.message)
    }
}

/**
 * Returns all regions.
 */
export const getAll = async (): Promise<Region[]> => {
    return await Region.findAll()
}
