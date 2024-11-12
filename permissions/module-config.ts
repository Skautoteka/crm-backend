import { RoleType } from "../interface/iauth";
import { PermissionConfig } from "../interface/ipermissions";

export const MODULE_PERMISSIONS: PermissionConfig = [
    { 
        role: RoleType.Admin,
        permission: {
            read: ['task', 'player', 'team', 'analysis', 'user', 'report'],
            create: ['task', 'player', 'team', 'analysis', 'user', 'report'],
            edit: ['task', 'player', 'team', 'analysis', 'user', 'report'],
            delete: ['task', 'player', 'team', 'analysis', 'user', 'report']
        } 
    },
    { 
        role: RoleType.Scout,
        permission: {
            read: ['task', 'player', 'team', 'analysis', 'user', 'report'],
            create: ['task', 'player', 'team', 'analysis', 'user', 'report'],
            edit: ['task', 'player', 'team', 'analysis', 'user', 'report'],
            delete: ['task', 'player', 'team', 'analysis', 'user', 'report']
        } 
    },
    { 
        role: RoleType.SportsDirector,
        permission: {
            read: ['task', 'player', 'team', 'analysis', 'user', 'report'],
            create: ['task', 'player', 'team', 'analysis', 'user', 'report'],
            edit: ['task', 'player', 'team', 'analysis', 'user', 'report'],
            delete: ['task', 'player', 'team', 'analysis', 'user', 'report']
        } 
    },
    { 
        role: RoleType.RegionManager,
        permission: {
            read: ['task', 'player', 'team', 'analysis', 'user', 'report'],
            create: ['task', 'player', 'team', 'analysis', 'user', 'report'],
            edit: ['task', 'player', 'team', 'analysis', 'user', 'report'],
            delete: ['task', 'player', 'team', 'analysis', 'user', 'report']
        } 
    },
    { 
        role: RoleType.RegionManager,
        permission: {
            read: ['task', 'player', 'team', 'analysis', 'user', 'report'],
            create: ['task', 'player', 'team', 'analysis', 'user', 'report'],
            edit: ['task', 'player', 'team', 'analysis', 'user', 'report'],
            delete: ['task', 'player', 'team', 'analysis', 'user', 'report']
        } 
    },
] 