export interface ISingleInputConfig {
    name: string
    placeholder: string
    label: string
    isRequired: boolean
    type: InputType
    options?: ISelectOption[]
    searchType?: string;
    valueTypes?: ISingleFilterConfig[]
}

export interface ISingleFilterConfig extends ISingleInputConfig {

}

export interface ISelectOption {
    value: string
    label: string
}

type InputType =
    | 'TEXT'
    | 'BOOL'
    | 'DATE'
    | 'NUMBER'
    | 'SELECT'
    | 'SEARCH'
    | 'DB'
    | 'MULTIVALUE'
