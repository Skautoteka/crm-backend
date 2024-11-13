import { RoleType } from "../interface/iauth";

/**
 * Builds module routes config.
 * 
 * @returns 
 */
export const getModuleRoutes = (role: RoleType) => {
    return ['task', 'report', 'player', 'team', 'analysis', 'user']
        .map(moduleName => _buildRoute(moduleName, role))
        .filter(route => route !== null)
}

/**
 * Builds a single route item.
 * 
 * @param role
 * @param name 
 * @returns 
 */
const _buildRoute = (name: string, role: RoleType) => {
    console.log(role)

    const label = _getLabel(name);
    const icon = _getIcon(name);
    const route = _getRoute(name);

    return { label, icon, route }
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
            return 'tasks';
        case 'report':
            return 'reports';
        case 'player':
            return 'players';
        case 'team':
            return 'teams';
        case 'analysis':
            return 'analysis';
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
            return 'move-task';
        case 'report':
            return 'file-document';
        case 'player':
            return 'user';
        case 'team':
            return 'organisation';
        case 'analysis':
            return 'chart';
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
            return 'Zadania';
        case 'report':
            return 'Raporty';
        case 'player':
            return 'Zawodnicy';
        case 'team':
            return 'Druzyny';
        case 'analysis':
            return 'Analiza';
        case 'user':
            return 'Uzytkownicy'
    }
}