import { RoleType } from '../interface/iauth';
import { PermissionConfig } from '../interface/ipermissions';

import { MODULE_PERMISSIONS as LEAGUE_PERMISSIONS } from '../permissions/league';

/**
 * Builds module routes config for leagues.
 *
 * @returns
 */
export const getLeagueRoutes = (role: RoleType) => {
    return ['league']
        .map((moduleName) => _buildLeagueRoute(moduleName, role))
        .filter((route) => route !== null);
};

/**
 * Builds a single league route item.
 *
 * @param role
 * @param name
 * @returns
 */
const _buildLeagueRoute = (name: string, role: RoleType) => {
    const config = _getLeaguePermission(name);

    if (!config.includes(role)) {
        return null;
    }

    const label = _getLeagueLabel(name);
    const icon = _getLeagueIcon(name);
    const route = _getLeagueRoute(name);

    return { label, icon, route };
};

const _getLeaguePermission = (name: string): PermissionConfig => {
    switch (name) {
        case 'league':
            return LEAGUE_PERMISSIONS;
        default:
            throw new Error(`Could not get permissions for module ${name}`);
    }
};

/**
 * Builds a route name for leagues.
 *
 * @param name
 * @returns
 */
const _getLeagueRoute = (name: string) => {
    switch (name) {
        case 'league':
            return 'leagues';
    }
};

/**
 * Gets icon for the league module.
 *
 * @param name
 * @returns
 */
const _getLeagueIcon = (name: string) => {
    switch (name) {
        case 'league':
            return 'trophy';
    }
};

/**
 * Gets label for the league module.
 *
 * @param name
 * @returns
 */
const _getLeagueLabel = (name: string) => {
    switch (name) {
        case 'league':
            return 'Ligi';
    }
};