import Report from '../db/models/report.model'
import { ISingleInputConfig } from '../interface'
import { ReportCreationAttributes } from '../db/models/report.model'
import { ModelValidationError } from '../error/model-validation'
import Player from '../db/models/player.model'
import { NotFoundError } from '../error/not-found'
import User from '../db/models/user.model'
import ReportTrait from '../db/models/report-trait.model'
import PlayerTrait from '../db/models/player-trait.model'
import ReportPosition from '../db/models/report-position.model'
import ReportDescription from '../db/models/report-description.model'
import Position from '../db/models/position.model'
import Team from '../db/models/team.model'

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
            traitId: 'PHYSICAL_STRENGTH',
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
export const getAll = async (user: User | null = null): Promise<Report[]> => {
    if (!user) {
        return await Report.findAll({
            include: [Player, ReportTrait, ReportPosition, ReportDescription],
        })
    } else {
        return await Report.findAll({
            include: [Player, ReportTrait, ReportPosition, ReportDescription],
            where: { createdById: user?.id },
        })
    }
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

/**
 * Returns all reports based on task id.
 *
 * @param taskId - The task ID used to filter reports.
 * @returns - List of reports based on the taskId.
 */
export const getAllByTaskId = async (taskId: string): Promise<Report[]> => {
    const data =
        (await Report.findAll({
            include: [
                {
                    model: Player,
                    include: [
                        {
                            model: Position,
                            required: false,
                        },
                        {
                            model: Team,
                            required: false,
                        },
                    ],
                },
                {
                    model: ReportTrait,
                    include: [
                        {
                            model: PlayerTrait,
                            required: false,
                        },
                    ],
                },
                ReportDescription,
            ],
            where: { taskId },
        })) ?? null
    return data
}



const getDefaultReportStatus = (): 'IN_PROGRESS' | 'COMPLETED' => {
    return 'IN_PROGRESS'
}
