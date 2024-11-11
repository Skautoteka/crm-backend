import { RoleType } from "./iauth";

export interface IPermission {
    read: string[];
    create: string[];
    edit: string[];
    delete: string[];
}

export interface IPermissionEntry {
    role: RoleType;
    permission: IPermission;
}

export type PermissionConfig = IPermissionEntry[];