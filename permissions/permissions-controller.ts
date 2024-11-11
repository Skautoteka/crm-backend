import { NotFoundError } from "../error/not-found";
import { RoleType } from "../interface/iauth";
import { IPermission } from "../interface/ipermissions"
import { MODULE_PERMISSIONS } from "./module-config";

export const getPermission = async (type: 'MODULE' | 'RECORD', role: RoleType, resource: string): Promise<IPermission> => {
    const permission = type === 'MODULE' ? _checkModulePermission(role) : _checkModulePermission(role);
    return permission;
} 

const _checkModulePermission = (role: RoleType): IPermission => {
    const permission = MODULE_PERMISSIONS.find(p => p.role === role);

    if(!permission) {
        throw new NotFoundError(`Could not find module permission for role ${role}`);
    }

    return permission.permission;
}