import Report from '../db/models/report.model'
import { ISingleInputConfig } from '../interface'
import { ReportCreationAttributes } from '../db/models/report.model'
import { ModelValidationError } from '../error/model-validation'
import Player from '../db/models/player.model'
import { NotFoundError } from '../error/not-found'
import User from '../db/models/user.model'

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
        {
            name: 'playerId',
            label: 'Zawodnik do raportu',
            isRequired: true,
            placeholder: 'Wyszukaj zawodnika',
            type: 'SEARCH',
            searchType: 'player',
        },
        {
            name: 'status',
            label: 'Status raportu',
            isRequired: false,
            placeholder: 'Wybier status raportu',
            type: 'SELECT',
            options: [
                { label: 'W trakcie', value: 'IN_PROGRESS' },
                { label: 'Ukonczony', value: 'COMPLETED' },
            ],
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
export const add = async (
    payload: ReportCreationAttributes,
    user: User
): Promise<Report> => {
    try {
        const report = new Report({ ...payload, createdById: user.id })

        if (!payload.status) {
            report.status = getDefaultReportStatus()
        }

        const { id } = await report.save()

        const added = await Report.findByPk(id, { include: [Player] })

        if (!added) {
            throw new NotFoundError('Could not find added report.')
        }

        return added
    } catch (err) {
        throw new ModelValidationError(err.message)
    }
}

/**
 * Returns all reports.
 *
 * @returns
 */
export const getAll = async (user: User): Promise<Report[]> => {
    return await Report.findAll({ include: Player, where: { createdById: user.id } })
}

const getDefaultReportStatus = (): 'IN_PROGRESS' | 'COMPLETED' => {
    return 'IN_PROGRESS'
}
