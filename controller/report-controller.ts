import Report from '../db/models/report.model'
import { ISingleInputConfig } from '../interface'
import { ReportCreationAttributes } from '../db/models/report.model'
import { InvalidPayloadError } from '../error/invalid-payload'
import { ModelValidationError } from '../error/model-validation'

/**
 * Gets the model for the task model creation.
 *
 * @returns
 */
export const getReportCreateFields = async (): Promise<
    ISingleInputConfig[]
> => {
    return [
        {
            name: 'name',
            label: 'Nazwa',
            isRequired: true,
            placeholder: 'Wpisz nazwę raportu',
            type: 'TEXT',
        },
    ]
}

/**
 * Removes a report from the database.
 *
 * @param id
 * @returns
 */
export const remove = async (id: string): Promise<void> => {
    const report = await Report.findOne({ where: { id } })

    if (report) {
        return await report.destroy()
    }
}

/**
 * Adds a report to the database
 *
 * @param param0
 * @returns
 */
export const add = async ({
    name,
}: ReportCreationAttributes): Promise<Report> => {
    if (!name) {
        throw new InvalidPayloadError('No name was provided')
    }

    try {
        const report = new Report({ name })
        report.status = getDefaultReportStatus()
        return await report.save()
    } catch (err) {
        throw new ModelValidationError(err.message)
    }
}

/**
 * Returns all reports.
 *
 * @returns
 */
export const getAll = async (): Promise<Report[]> => {
    return await Report.findAll()
}

const getDefaultReportStatus = (): 'in_progress' | 'finished' => {
    return 'in_progress'
}
