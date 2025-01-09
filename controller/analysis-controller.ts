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

/**
 * Sends analysis request to crm-analysis microservice and returns the response
 *
 * @param filters
 */
export const sendAnalysis = async (
    filters: Record<string, any>,
    playerId: string,
    regionId: string
) => {
    console.log(filters, regionId, playerId)
}
