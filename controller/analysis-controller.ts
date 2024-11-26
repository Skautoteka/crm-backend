import { ISingleInputConfig } from "../interface";

/**
 * Return create fields for report analysis
 * 
 * @returns 
 */
export const getReportCreateFields = async (): Promise<ISingleInputConfig[]> => {
    return [
        {
            name: 'hostTeamId',
            label: 'Drużyna gości',
            isRequired: true,
            placeholder: 'Wyszukaj druzyne gosci',
            type: 'SEARCH',
            searchType: 'team',
        },
    ]
}

/**
 * Return create fields for note analysis
 * 
 * @returns 
 */
export const getNoteCreateFields = async (): Promise<ISingleInputConfig[]> => {
    return [
        {
            name: 'hostTeamId',
            label: 'Drużyna gości',
            isRequired: true,
            placeholder: 'Wyszukaj druzyne gosci',
            type: 'SEARCH',
            searchType: 'team',
        },
    ]
}