import { RoleType } from '../interface/iauth'
import { PermissionConfig } from '../interface/ipermissions'

import { MODULE_PERMISSIONS as ANALYSIS_PERMISSIONS } from '../permissions/analysis'
import { MODULE_PERMISSIONS as PLAYER_PERMISSIONS } from '../permissions/player'
import { MODULE_PERMISSIONS as REPORT_PERMISSIONS } from '../permissions/report'
import { MODULE_PERMISSIONS as TASK_PERMISSIONS } from '../permissions/task'
import { MODULE_PERMISSIONS as TEAM_PERMISSIONS } from '../permissions/team'
import { MODULE_PERMISSIONS as USER_PERMISSIONS } from '../permissions/user'

/**
 * Builds module routes config.
 *
 * @returns
 */
export const getModuleRoutes = (role: RoleType) => {
    return ['task', 'report', 'player', 'team', 'analysis', 'user']
        .map((moduleName) => _buildRoute(moduleName, role))
        .filter((route) => route !== null)
}

/**
 * Builds a single route item.
 *
 * @param role
 * @param name
 * @returns
 */
const _buildRoute = (name: string, role: RoleType) => {
    const config = _getPermission(name)

    if (!config.includes(role)) {
        return null
    }

    const label = _getLabel(name)
    const icon = _getIcon(name)
    const route = _getRoute(name)

    return { label, icon, route }
}

const _getPermission = (name: string): PermissionConfig => {
    switch (name) {
        case 'task':
            return TASK_PERMISSIONS
        case 'report':
            return REPORT_PERMISSIONS
        case 'player':
            return PLAYER_PERMISSIONS
        case 'team':
            return TEAM_PERMISSIONS
        case 'analysis':
            return ANALYSIS_PERMISSIONS
        case 'user':
            return USER_PERMISSIONS
        default:
            throw new Error(`Could not get permissions for module ${name}`)
    }
}

/**
 * Builds a route name based on the module name.
 *
 * @param name
 * @returns
 */
const _getRoute = (name: string) => {
    switch (name) {
        case 'task':
            return 'tasks'
        case 'report':
            return 'reports'
        case 'player':
            return 'players'
        case 'team':
            return 'teams'
        case 'analysis':
            return 'analysis'
        case 'user':
            return 'users'
    }
}

/**
 * Gets icon for the module based on the module name.
 *
 * @param name
 * @returns
 */
const _getIcon = (name: string) => {
    switch (name) {
        case 'task':
            return 'move-task'
        case 'report':
            return 'file-document'
        case 'player':
            return 'user'
        case 'team':
            return 'organisation'
        case 'analysis':
            return 'chart'
        case 'user':
            return 'user-list'
    }
}

/**
 * Gets label for the module based on the name of the module.
 *
 * @param name
 * @returns
 */
const _getLabel = (name: string) => {
    switch (name) {
        case 'task':
            return 'Zadania'
        case 'report':
            return 'Raporty'
        case 'player':
            return 'Zawodnicy'
        case 'team':
            return 'Druzyny'
        case 'analysis':
            return 'Analiza'
        case 'user':
            return 'Uzytkownicy'
    }
}
