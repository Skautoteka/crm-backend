import Report from '../db/models/report.model'
import { ISingleInputConfig } from '../interface'
import { ReportCreationAttributes } from '../db/models/report.model'
import { ModelValidationError } from '../error/model-validation'
import Player from '../db/models/player.model'
import { NotFoundError } from '../error/not-found'
import User from '../db/models/user.model'
import ReportTrait, {
    ReportTraitCreationAttributes,
} from '../db/models/report-trait.model'
import PlayerTrait from '../db/models/player-trait.model'
import ReportPosition from '../db/models/report-position.model'
import ReportDescription from '../db/models/report-description.model'
import Position from '../db/models/position.model'
import Team from '../db/models/team.model'
import PositionTrait from '../db/models/position-traits.model'

import PDFKit from 'pdfkit'

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
export const getReportFields = async (
    id: string
): Promise<ISingleInputConfig[]> => {
    console.log('Fetching report fields with id:', id)

    const currentYear = new Date().getFullYear()

    try {
        const report = await Report.findOne({
            where: { id },
            include: [
                Player,
                {
                    model: ReportTrait,
                    include: [
                        {
                            model: PlayerTrait,
                            required: false,
                        },
                    ],
                },
                ReportPosition,
                ReportDescription,
            ],
        })

        if (!report) {
            console.error(`No report found for id: ${id}`)
            throw new Error(`Report with id ${id} not found.`)
        }

        const startFields: ISingleInputConfig[] = [
            {
                name: 'firstName',
                label: 'Imię',
                value: report?.player?.firstName,
                isRequired: false,
                isDisabled: true,
                placeholder: 'Uzupełnij w profilu zawodnika',
                type: 'TEXT',
            },
            {
                name: 'lastName',
                label: 'Nazwisko',
                value: report?.player?.lastName,
                isRequired: false,
                isDisabled: true,
                placeholder: 'Uzupełnij w profilu zawodnika',
                type: 'TEXT',
            },
            {
                name: 'age',
                label: 'Wiek',
                value: report?.player?.birthYear
                    ? currentYear - report.player.birthYear
                    : null,
                isRequired: false,
                isDisabled: true,
                placeholder: 'Uzupełnij w profilu zawodnika',
                type: 'NUMBER',
            },
            {
                name: 'nationality',
                label: 'Narodowość',
                value: report?.player?.nationality,
                isRequired: false,
                isDisabled: true,
                placeholder: 'Uzupełnij w profilu zawodnika',
                type: 'TEXT',
            },
            {
                name: 'height',
                label: 'Wzrost',
                value: report?.player?.height,
                isRequired: false,
                isDisabled: true,
                placeholder: 'Uzupełnij w profilu zawodnika',
                type: 'NUMBER',
            },
            {
                name: 'weight',
                label: 'Waga',
                value: report?.player?.weight,
                isRequired: false,
                isDisabled: true,
                placeholder: 'Uzupełnij w profilu zawodnika',
                type: 'NUMBER',
            },
            {
                name: 'position',
                label: 'Pozycja',
                value: report?.player?.position?.name,
                isRequired: false,
                isDisabled: true,
                placeholder: 'Uzupełnij w profilu zawodnika',
                type: 'TEXT',
            },
            {
                name: 'alternativePosition',
                label: 'Pozycja opcjonalna',
                value: report?.player?.position?.name,
                isRequired: false,
                isDisabled: true,
                placeholder: 'Uzupełnij w profilu zawodnika',
                type: 'TEXT',
            },
            {
                name: 'physique',
                label: 'Budowa ciała',
                value: report?.player?.physique,
                isRequired: false,
                isDisabled: true,
                placeholder: 'Uzupełnij w profilu zawodnika',
                type: 'TEXT',
            },
            {
                name: 'physicalDescription',
                label: 'Opis postawy fizycznej',
                value: report?.description?.physicalDescription,
                isRequired: false,
                placeholder: 'Wpisz postawę fizyczną',
                type: 'TEXTAREA',
            },
            {
                name: 'mentalDescription',
                label: 'Opis postawy mentalnej',
                value: report?.description?.mentalDescription,
                isRequired: false,
                placeholder: 'Wpisz opis postawy mentalnej',
                type: 'TEXTAREA',
            },
            {
                name: 'technicalDescription',
                label: 'Opis postawy technicznej',
                value: report?.description?.technicalDescription,
                isRequired: false,
                placeholder: 'Wpisz opis postawy technicznej',
                type: 'TEXTAREA',
            },
        ]

        const endFields: ISingleInputConfig[] = [
            {
                name: 'evaluation',
                label: 'Ocena',
                value: report?.description?.evaluation,
                isRequired: false,
                placeholder: 'Wpisz ocenę',
                type: 'NUMBER',
                min: 1,
                max: 10,
            },
            {
                name: 'potential',
                label: 'Potencjał',
                value: report?.description?.potential,
                isRequired: false,
                placeholder: 'Wybierz potencjał',
                type: 'SELECT',
                options: [
                    { label: 'Ekstraklasa', value: 'Extraclass' },
                    { label: 'I liga', value: 'leagueI' },
                    { label: 'II liga', value: 'leagueII' },
                    { label: 'III liga', value: 'leagueIII' },
                    { label: 'VI liga', value: 'leagueIV' },
                    { label: 'V liga', value: 'leagueV' },
                    { label: 'A-klasa', value: 'classA' },
                    { label: 'B-klasa', value: 'classB' },
                    { label: 'Zespoły młodzieżowe', value: 'youth' },
                ],
            },
            {
                name: 'formationId',
                label: 'Formacja',
                value: report?.description?.formation?.name,
                isRequired: false,
                placeholder: 'Wybierz formację',
                type: 'DB',
                searchType: 'team-formations',
            },
            {
                name: 'team',
                label: 'Aktualna drużyna',
                value: report?.player?.team?.name,
                isRequired: false,
                isDisabled: true,
                placeholder: 'Uzupełnij drużynę w profilu zawodnika',
                type: 'TEXT',
            },
            {
                name: 'opponentId',
                label: 'Przeciwnik w ocenianym meczu',
                value: report?.description?.opponentId,
                isRequired: false,
                placeholder: 'Wybierz przeciwnika w ocenianym meczu',
                type: 'DB',
                searchType: 'team',
            },
            {
                name: 'league',
                label: 'Liga',
                value: report?.player?.team?.league,
                isRequired: false,
                isDisabled: true,
                placeholder: 'Uzupełnij drużynę w profilu zawodnika',
                type: 'TEXT',
            },
            {
                name: 'timePlayed',
                label: 'Liczba rozegranych minut',
                value: report?.description?.timePlayed,
                isRequired: false,
                placeholder: 'Wpisz liczbę rozegranych minut',
                type: 'NUMBER',
            },
            {
                name: 'goalsScored',
                label: 'Liczba strzelonych bramek',
                value: report?.description?.goalsScored,
                isRequired: false,
                placeholder: 'Wpisz liczbę strzelonych bramek',
                type: 'NUMBER',
            },
            {
                name: 'assist',
                label: 'Liczba asyst',
                value: report?.description?.assists,
                isRequired: false,
                placeholder: 'Wpisz liczbę asyst',
                type: 'NUMBER',
            },
            {
                name: 'summary',
                label: 'Podsumowanie',
                value: report?.description?.summary,
                isRequired: false,
                placeholder: 'Wpisz podsumowanie',
                type: 'TEXTAREA',
            },
        ]

        const traitFields: ISingleInputConfig[] = (report?.traits || []).map(
            (trait) => ({
                name: `trait_${trait.trait.id}`,
                label: trait.trait.name,
                value: trait.value,
                isRequired: false,
                placeholder: `Wpisz ocenę dla ${trait.trait.name}`,
                type: 'NUMBER',
                min: 1,
                max: 5,
            })
        )

        return [...startFields, ...traitFields, ...endFields]
    } catch (error) {
        console.error('Error fetching report fields:', error)
        throw new Error(
            'Unable to fetch report fields. Please try again later.'
        )
    }
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
        console.log(payload)
        const reportPlayer = await Player.findByPk(payload.playerId)

        if (!reportPlayer) {
            throw new NotFoundError('Player not found.')
        }

        const reportObject = {
            status: payload.status || getDefaultReportStatus(),
            playerId: payload.playerId,
            taskId: payload.taskId,
            regionId: payload.regionId,
            traits: payload.traits,
            positions: payload.positions,
            description: payload.description,
            createdById: user.id,
        } as Report

        const report = new Report(reportObject)

        const { id } = await report.save()

        const playerPositionTraits = await PositionTrait.findAll({
            where: { positionId: reportPlayer.positionId },
        })

        if (playerPositionTraits.length > 0) {
            const reportTraits = playerPositionTraits.map((positionTrait) => ({
                traitId: positionTrait.playerTraitId,
                reportId: id,
                value: null,
            }))

            // @ts-expect-error ...
            await ReportTrait.bulkCreate(reportTraits)
        }

        const added = await Report.findByPk(id, {
            include: [
                { model: Player, as: 'player' },
                { model: ReportTrait, as: 'traits' },
            ],
        })

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

export const unassignReport = async (id: string): Promise<void> => {
    const report = await Report.findByPk(id)

    if (!report) {
        throw new NotFoundError('Could not unassign report by id ' + id)
    }

    report.update({ taskId: null })
    await report.save()
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
            ReportTrait,
        ],
        attributes: { exclude: ['createdAt', 'updatedAt'] },
    })
}

/**
 * Retrieves all tasks that are unassigned.
 *
 * @returns
 */
export const getAllUnassigned = async (): Promise<Report[]> => {
    const tasks = await Report.findAll({
        where: { taskId: null },
        include: [Player],
    })
    return tasks
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

/**
 * Updates report and its related models
 */
export const updateReportWithDetails = async (
    updateData: ReportDescription
): Promise<Report> => {
    try {
        const report = await Report.findByPk(updateData.id)
        if (!report) {
            throw new NotFoundError('Report not found')
        }

        await ReportDescription.upsert({
            reportId: updateData.id,
            physicalDescription: updateData.physicalDescription,
            mentalDescription: updateData.mentalDescription,
            technicalDescription: updateData.technicalDescription,
            evaluation: updateData.evaluation,
            potential: updateData.potential,
            timePlayed: updateData.timePlayed,
            goalsScored: updateData.goalsScored,
            assists: updateData.assists,
            summary: updateData.summary,
            opponentId: updateData.opponentId,
            formationId: updateData.formationId,
        })

        const traitUpdates = Object.entries(updateData)
            .filter(([key]) => key.startsWith('trait_'))
            .map(
                ([key, value]): ReportTraitCreationAttributes => ({
                    traitId: key.replace('trait_', ''),
                    reportId: updateData.id,
                    value: value,
                })
            )

        for (const trait of traitUpdates) {
            await ReportTrait.upsert(trait as unknown as ReportTrait)
        }

        await report.reload({
            include: [Player, ReportTrait, ReportPosition, ReportDescription],
        })

        return report
    } catch (error) {
        throw new ModelValidationError(error.message)
    }
}

const getDefaultReportStatus = (): 'IN_PROGRESS' | 'COMPLETED' => {
    return 'IN_PROGRESS'
}

/**
 * Generates pdf for report
 */
export const generatePDF = async (
    id: string,
    onChunk: (chunk: any) => boolean,
    onEnd: () => any
) => {
    const report = await Report.findByPk(id, {
        include: [{ model: Player, include: [Position, Team] }, ReportTrait],
    })

    if (!report) {
        throw new NotFoundError('Could not find report by id' + id)
    }

    const doc = new PDFKit()

    doc.on('data', onChunk)
    doc.on('end', onEnd)

    doc.image('./assets/logo.png', 50, 50, { scale: 0.5 })

    doc.font('assets/IBMPlexSans-Bold.ttf')
        .fontSize(18)
        .text('Skautoteka.info', 95, 48)

    doc.fillColor('#4e4e4e')
        .font('assets/IBMPlexSans-Regular.ttf')
        .fontSize(10)
        .text(
            'Raport wygenerowany dnia ' +
                new Date().toLocaleDateString('pl-PL'),
            95,
            70
        )

    const headerY = _createHeader(
        doc,
        'Informacje ogólne',
        'Przeglądaj podstawowe informacje',
        120,
        50
    )

    const y = _createRow(doc, headerY + 10, 50, [
        { label: 'Imię i nazwisko', value: report.player.name },
        { label: 'Rok urodzenia', value: report.player.birthYear.toString() },
        {
            label: 'Płeć',
            value: report.player.sex === 'MALE' ? 'Mężczyzna' : 'Kobieta',
        },
    ])

    const y2 = _createRow(doc, y, 50, [
        { label: 'Kraj', value: report.player.nationality },
        { label: 'Pozycja', value: report.player.position?.name },
        { label: 'Zespół', value: report.player.team.name },
    ])

    const y3 = _createRow(doc, y2, 50, [
        {
            label: 'Wzrost (cm)',
            value: report.player.height.toString() || 'Brak informacji',
        },
        { label: 'Masa ciała (kg)', value: report.player.weight.toString() },
        { label: 'Postawa', value: report.player.physique },
    ])

    const y4 = _createHeader(
        doc,
        'Oceny raportów',
        'Różne aspekty ocenione od 1 do 10',
        y3 + 20,
        50
    )

    const traits = report.traits

    if (!traits.length) {
        doc.fillColor('#183932')
            .font('assets/IBMPlexSans-Regular.ttf')
            .fontSize(12)
            .text('Brak informacji o ocenach z raportu', 50, 440, {
                align: 'center',
            })
    }

    let currY = y4 + 10

    for (let i = 0; i < traits.length; i = i + 3) {
        const trait1 = await PlayerTrait.findByPk(traits[i].id || '')
        const trait2 = await PlayerTrait.findByPk(traits[i + 1].id || '')
        const trait3 = await PlayerTrait.findByPk(traits[i + 2].id || '')

        currY = _createRow(doc, currY, 50, [
            {
                label: trait1?.name || '',
                value: traits[i].value?.toString() || '',
            },
            {
                label: trait2?.name || '',
                value: traits[i + 1].value?.toString() || '',
            },
            {
                label: trait3?.name || '',
                value: traits[i + 2].value?.toString() || '',
            },
        ])
    }

    doc.fillColor('#4e4e4e')
        .font('assets/IBMPlexSans-Regular.ttf')
        .fontSize(10)
        .text('Podpis i pieczątka scouta', 50, 700 - 20)

    doc.lineWidth(0.5).rect(50, 700, 200, 50).stroke()

    doc.end()
}

const _createHeader = (
    doc: PDFKit.PDFDocument,
    value: string,
    subValue: string,
    y: number,
    x: number
): number => {
    y = _validateY(doc, y)

    doc.fillColor('#183932')
        .font('assets/IBMPlexSans-SemiBold.ttf')
        .fontSize(12)
        .text(value, x, y)

    doc.fillColor('#4e4e4e')
        .font('assets/IBMPlexSans-Regular.ttf')
        .fontSize(10)
        .text(subValue, x, y + 20)

    return y + 50
}

const _validateY = (doc: PDFKit.PDFDocument, y: number): number => {
    if (y > doc.page.height) {
        doc.addPage()
        y = 50
    }

    return y
}

const _createRow = (
    doc: PDFKit.PDFDocument,
    y: number,
    height: number,
    rowArr: {
        label: string
        value: string
    }[]
): number => {
    y = _validateY(doc, y)
    let x = 50

    for (let i = 0; i < rowArr.length; i++) {
        const item = rowArr[i]

        doc.fillColor('#2f4d47')
            .font('assets/IBMPlexSans-Medium.ttf')
            .fontSize(10)
            .text(item.label, x, y)

        doc.fillColor('#1b1b1b')
            .font('assets/IBMPlexSans-Regular.ttf')
            .fontSize(10)
            .text(item.value, x, y + 16, { width: 130, height })

        x += 190
    }

    return y + height
}
