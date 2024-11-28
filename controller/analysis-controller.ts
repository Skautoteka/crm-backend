import { ISingleInputConfig } from "../interface";

/**
 * Return create fields for report analysis
 * 
 * @returns 
 */
export const getReportCreateFields = async (): Promise<ISingleInputConfig[]> => {
    return [
        {
            name: 'filters',
            label: 'Filtry',
            isRequired: false,
            placeholder: 'Wybierz nowy filtr',
            type: 'MULTIVALUE',
            valueTypes: [
                {
                    name: 'trait',
                    label: 'Cecha zawodnika',
                    isRequired: true,
                    placeholder: 'Wyszukaj druzyne gosci',
                    type: 'SEARCH',
                    searchType: 'team',
                },
                {
                    name: 'teamId',
                    label: 'Drużyna',
                    isRequired: true,
                    placeholder: 'Wyszukaj druzyne gosci',
                    type: 'SEARCH',
                    searchType: 'team',
                },
            ]
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
            name: 'filters',
            label: 'Filtry',
            isRequired: false,
            placeholder: 'Wybierz nowy filtr',
            type: 'MULTIVALUE',
            valueTypes: [
                {
                    name: 'trait',
                    label: 'Cecha zawodnika',
                    isRequired: true,
                    placeholder: 'Wyszukaj druzyne gosci',
                    type: 'SEARCH',
                    searchType: 'team',
                },
                {
                    name: 'teamId',
                    label: 'Drużyna',
                    isRequired: true,
                    placeholder: 'Wyszukaj druzyne gosci',
                    type: 'SEARCH',
                    searchType: 'team',
                },
            ]
        },
    ]
}