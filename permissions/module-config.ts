import { RoleType } from "../interface/iauth";
import { PermissionConfig } from "../interface/ipermissions";

export const MODULE_PERMISSIONS: PermissionConfig = [
    { 
        role: RoleType.Admin,
        permission: {
            read: ['task'],
            create: ['task'],
            edit: ['task'],
            delete: ['task']
        } 
    },
    { 
        role: RoleType.Admin,
        permission: {
            read: [],
            create: [],
            edit: [],
            delete: []
        } 
    },
    { 
        role: RoleType.Admin,
        permission: {
            read: [],
            create: [],
            edit: [],
            delete: []
        } 
    },
    { 
        role: RoleType.Admin,
        permission: {
            read: [],
            create: [],
            edit: [],
            delete: []
        } 
    },
] 