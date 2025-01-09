import ReportTrait from '../db/models/report-trait.model'

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
    return []
}
