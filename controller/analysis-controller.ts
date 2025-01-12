import ReportTrait from '../db/models/report-trait.model'
import fetch from 'node-fetch'
import { IFilters } from '../interface/ianalysis'

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
    return [{ name: 'ASSESSMENT', label: 'Ocena' }]
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
            filters: filters.filter((f) => f.value !== null),
        }),
    })

    return await response.json()
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
            filters: filters.filter((f) => f.value !== null),
        }),
    })

    return await response.json()
}
