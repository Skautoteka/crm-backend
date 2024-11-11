import { IPermission } from "../interface/ipermissions"

export const getPermission = async (type: 'MODULE' | 'RECORD', role: string, name: string): Promise<IPermission> => {
    return type === 'MODULE' ? _checkModulePermission(role, name) : _checkModulePermission(role, name);
} 

const _checkModulePermission = async (role: string, name: stringx): Promise<IPermission> => {
    
}