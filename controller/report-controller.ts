import Report from '../db/models/report.model'
import { ISingleInputConfig } from '../interface'
import { ReportCreationAttributes } from '../db/models/report.model'
import { ModelValidationError } from '../error/model-validation'
import Player from '../db/models/player.model'
import { NotFoundError } from '../error/not-found'
import User from '../db/models/user.model'
import ReportTrait from '../db/models/report-trait.model'
import PlayerTrait from '../db/models/player-trait.model'

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
        {
            name: 'regionId',
            label: 'Region',
            isRequired: true,
            placeholder: 'Wybierz region raportu',
            type: 'SEARCH',
            searchType: 'region',
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

        const reportTrait = new ReportTrait({
            traitId: 'e0a6b3f5-1234-4f3b-912d-b44a63a1e2b8',
            reportId: report.id,
        })
        await reportTrait.save()

        const added = await Report.findByPk(id, {
            include: [{ model: Player, as: 'player' }],
        })

        if (!added) {
            throw new NotFoundError('Could not find added report.')
        }

        return added
    } catch (err) {
        console.log(err)
        throw new ModelValidationError(err.message)
    }
}

/**
 * Returns all reports.
 *
 * @returns
 */
export const getAll = async (user: User): Promise<Report[]> => {
    return await Report.findAll({
        include: Player,
        where: { createdById: user.id },
    })
}

/**
 * Retrieves all detailed reports.
 * @returns
 */
export const getAllDetailed = async (): Promise<Report[]> => {
    return await Report.findAll({
        include: [
            {
                model: Player,
                attributes: { exclude: ['createdAt', 'updatedAt'] },
            },
            PlayerTrait,
        ],
        attributes: { exclude: ['createdAt', 'updatedAt'] },
    })
}

const getDefaultReportStatus = (): 'IN_PROGRESS' | 'COMPLETED' => {
    return 'IN_PROGRESS'
}
