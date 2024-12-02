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
 * Gets the model for the report model creation.
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
            placeholder: 'Wybierz status raportu',
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
 * Gets the model for the report.
 *
 * @param id - The ID of the report to fetch.
 * @returns A list of input configurations for the report.
 */
export const getReportFields = async (id: string): Promise<ISingleInputConfig[]> => {
    console.log('Fetching report fields with id:', id);

    const currentYear = new Date().getFullYear();

    try {
        const report = await Report.findOne({
            where: { id },
            include: [Player, ReportTrait, ReportPosition, ReportDescription],
        });

        if (!report) {
            console.error(`No report found for id: ${id}`);
            throw new Error(`Report with id ${id} not found.`);
        }

        const baseFields: ISingleInputConfig[] = [
            {
                name: 'firstName',
                label: 'Imię',
                value: report?.player?.firstName || '',
                isRequired: true,
                placeholder: 'Wpisz imię',
                type: 'TEXT',
            },
            {
                name: 'lastName',
                label: 'Nazwisko',
                value: report?.player?.lastName || '',
                isRequired: true,
                placeholder: 'Wpisz nazwisko',
                type: 'TEXT',
            },
            {
                name: 'age',
                label: 'Wiek',
                value: report?.player?.birthYear
                    ? currentYear - report.player.birthYear
                    : '',
                isRequired: true,
                placeholder: 'Wpisz wiek',
                type: 'NUMBER',
            },
            {
                name: 'nationality',
                label: 'Narodowość',
                value: report?.player?.nationality || '',
                isRequired: true,
                placeholder: 'Wpisz narodowość',
                type: 'TEXT',
            },
            {
                name: 'position',
                label: 'Pozycja',
                value: report?.player?.position?.name || '',
                isRequired: true,
                placeholder: 'Wpisz pozycję',
                type: 'TEXT',
            },
            {
                name: 'alternativePosition',
                label: 'Pozycja opcjonalna',
                value: report?.player?.position?.name || '',
                isRequired: true,
                placeholder: 'Wpisz pozycję',
                type: 'TEXT',
            },
            {
                name: 'height',
                label: 'Wzrost',
                value: report?.player?.height || '',
                isRequired: true,
                placeholder: 'Wpisz wzrost',
                type: 'NUMBER',
            },
            {
                name: 'weight',
                label: 'Waga',
                value: report?.player?.weight || '',
                isRequired: true,
                placeholder: 'Wpisz wagę',
                type: 'NUMBER',
            },
            {
                name: 'physique',
                label: 'Budowa ciała',
                value: report?.player?.physique || '',
                isRequired: true,
                placeholder: 'Wpisz budowę ciała',
                type: 'TEXT',
            },
            {
                name: 'physicalDescription',
                label: 'Opis postawy fizycznej',
                value: report?.description?.physicalDescription || '',
                isRequired: true,
                placeholder: 'Wpisz postawę fizyczną',
                type: 'TEXT',
            },
            {
                name: 'mentalDescription',
                label: 'Opis postawy mentalnej',
                value: report?.description?.mentalDescription || '',
                isRequired: true,
                placeholder: 'Wpisz opis postawy mentalnej',
                type: 'TEXT',
            },
            {
                name: 'technicalDescription',
                label: 'Opis postawy technicznej',
                value: report?.description?.technicalDescription || '',
                isRequired: true,
                placeholder: 'Wpisz opis postawy technicznej',
                type: 'TEXT',
            },
            {
                name: 'evaluation',
                label: 'Ocena',
                value: report?.description?.evaluation || '',
                isRequired: true,
                placeholder: 'Wpisz ocenę',
                type: 'TEXT',
            },
            {
                name: 'potential',
                label: 'Potencjał',
                value: report?.description?.potential || '',
                isRequired: true,
                placeholder: 'Wpisz potencjał',
                type: 'TEXT',
            },
            {
                name: 'formation',
                label: 'Formacja',
                value: report?.description?.formation?.name || '',
                isRequired: true,
                placeholder: 'Wpisz formację',
                type: 'TEXT',
            },
            {
                name: 'team',
                label: 'Aktualna drużyna',
                value: report?.player?.team?.name || '',
                isRequired: true,
                placeholder: 'Wpisz aktualną drużynę',
                type: 'TEXT',
            },
            {
                name: 'opponent',
                label: 'Przeciwnik w ocenianym meczu',
                value: report?.description?.opponentId || '',
                isRequired: true,
                placeholder: 'Wpisz przeciwnika w ocenianym meczu',
                type: 'TEXT',
            },
            {
                name: 'league',
                label: 'Liga',
                value: report?.player?.team?.league || '',
                isRequired: true,
                placeholder: 'Wpisz ligę',
                type: 'TEXT',
            },
            {
                name: 'timePlayed',
                label: 'Liczba rozegranych minut',
                value: report?.description?.timePlayed || '',
                isRequired: true,
                placeholder: 'Wpisz liczbę rozegranych minut',
                type: 'NUMBER',
            },
            {
                name: 'goalsScored',
                label: 'Liczba strzelonych bramek',
                value: report?.description?.goalsScored || '',
                isRequired: true,
                placeholder: 'Wpisz liczbę strzelonych bramek',
                type: 'NUMBER',
            },
            {
                name: 'assist',
                label: 'Liczba asyst',
                value: report?.description?.assists || '',
                isRequired: true,
                placeholder: 'Wpisz liczbę asyst',
                type: 'NUMBER',
            },
            {
                name: 'summary',
                label: 'Podsumowanie',
                value: report?.description?.summary || '',
                isRequired: true,
                placeholder: 'Wpisz podsumowanie',
                type: 'TEXT',
            },
        ];

        const traitFields: ISingleInputConfig[] = (report?.traits || []).map((trait) => ({
            name: `trait_${trait.trait.id}`,
            label: trait.trait.name,
            value: trait.value || '',
            isRequired: false,
            placeholder: 'Cecha',
            type: 'NUMBER',
        }));

        return [...baseFields, ...traitFields];
    } catch (error) {
        console.error('Error fetching report fields:', error);
        throw new Error('Unable to fetch report fields. Please try again later.');
    }
};



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
