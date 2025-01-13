import ReportTrait from '../db/models/report-trait.model'
import fetch from 'node-fetch'
import { IFilters } from '../interface/ianalysis'
import { InvalidPayloadError } from '../error/invalid-payload'
import Player from '../db/models/player.model'
import Note from '../db/models/note.model'
import Report from '../db/models/report.model'

/**
 * Retrieves all available filters for reports
 */
export const getReportFilters = async () => {
    const traits = await ReportTrait.findAll()
    return traits.map((trait) => ({
        name: trait.traitId,
        label: trait.traitLabel,
    }))
}

/**
 * Retrieves all available filters for notes
 */
export const getNoteFilters = async () => {
    return [{ name: 'evaluation', label: 'Ocena' }]
}

/**
 * Sends analysis request to crm-analysis microservice and returns the response
 *
 * @param filters
 */
export const sendReportAnalysis = async (
    filters: IFilters[],
    playerId: string | null,
    regionId: string | null
) => {
    filters = filters.map((f) => ({ ...f, key: f.key.toLowerCase() }))

    if (playerId) {
        filters = [
            ...filters,
            { key: 'playerId', value: playerId, predicate: 'eq' },
        ]
    }

    if (regionId) {
        filters = [
            ...filters,
            { key: 'regionId', value: regionId, predicate: 'eq' },
        ]
    }

    const response = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            type: 'report',
            filters: filters
                .filter((f) => f.value !== null)
                .map((f) => ({
                    ...f,
                    value: f.value.toString(),
                })),
        }),
    })

    if (response.status !== 200) {
        throw new InvalidPayloadError(response.statusText)
    }

    const json = (await response.json()) as any
    return await _findRelated(json, 'report')
}

/**
 * Sends analysis request from note to crm-analysis and returns the response
 *
 * @param filters
 * @param teamId
 */
export const sendNoteAnalysis = async (
    filters: IFilters[],
    teamId: string | null
) => {
    filters = filters.map((f) => ({ ...f, key: f.key.toLowerCase() }))

    if (teamId) {
        filters = [
            ...filters,
            { key: 'teamId', value: teamId, predicate: 'eq' },
        ]
    }

    const response = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            type: 'note',
            filters: filters
                .filter((f) => f.value !== null)
                .map((f) => ({
                    ...f,
                    value: f.value.toString(),
                })),
        }),
    })

    if (response.status !== 200) {
        throw new InvalidPayloadError(response.statusText)
    }

    const json = (await response.json()) as any
    return await _findRelated(json, 'note')
}

const _findRelated = async (
    response: Record<string, any>[],
    type: 'note' | 'report'
): Promise<any> => {
    let result: any[] = []

    for (let i = 0; i < response.length; i++) {
        const record = response[i]

        const playerId = record.playerId
        const relatedIds = record.related

        const player = await Player.findByPk(playerId)

        result = [
            ...result,
            {
                ...record,
                player,
                related: await _findRelatedRecords(relatedIds, type),
            },
        ]
    }

    return result
}

const _findRelatedRecords = async (
    relatedIds: string[],
    type: 'note' | 'report'
) => {
    let result: any[] = []

    for (let i = 0; i < relatedIds.length; i++) {
        const id = relatedIds[i]

        if (type === 'note') {
            const record = await Note.findByPk(id)
            result = [...result, record]
        } else {
            const record = await Report.findByPk(id)
            result = [...result, record]
        }
    }

    return result
}
