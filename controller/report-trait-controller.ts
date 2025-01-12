import ReportTrait from '../db/models/report-trait.model'
import { ReportTraitCreationAttributes } from '../db/models/report-trait.model'
import { InvalidPayloadError } from '../error/invalid-payload'
import { ModelValidationError } from '../error/model-validation'

/**
 * Removes a reportTrait from a database.
 *
 * @param id
 * @returns
 */
export const remove = async (id: string): Promise<void> => {
    const reportTrait = await ReportTrait.findOne({ where: { id } })

    if (reportTrait) {
        return await reportTrait.destroy()
    }
}

/**
 * Adds a new reportTrait to the system.
 *
 * @param param0
 * @returns
 */
export const add = async (
    payload: ReportTraitCreationAttributes
): Promise<ReportTrait> => {
    if (!payload.traitId || !payload.reportId) {
        throw new InvalidPayloadError('No trait id or report id was provided')
    }

    const reportTraitObject = {
        traitId: payload.traitId,
        reportId: payload.reportId,
        value: payload.value,
    } as ReportTrait

    try {
        const reportTrait = new ReportTrait(reportTraitObject)
        return await reportTrait.save()
    } catch (err) {
        throw new ModelValidationError(err.message)
    }
}

/**
 * Returns all regions.
 */
export const getAll = async (): Promise<ReportTrait[]> => {
    return await ReportTrait.findAll()
}

/**
 * Gets basic role in the system.
 *
 * @returns
 */
export const getRegion = async (
    regionId: string | null
): Promise<ReportTrait | null> => {
    const reportTrait = await ReportTrait.findOne({ where: { id: regionId } })

    return reportTrait
}
