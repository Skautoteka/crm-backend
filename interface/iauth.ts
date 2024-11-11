export type Tokens = {
    accessToken: string
    refreshToken: string
}

export type AccessToken = {
    accessToken: string
}

export enum RoleTypes {
    Admin = 'ADMIN',
    SportsDirector = 'SPORTS_DIRECTOR',
    RegionManager = 'REGION_MANAGER',
    Scout = 'SCOUT',
    Analytics = 'ANALYTICS'
}