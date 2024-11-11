export interface IPermission {
    read: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
}

export interface IPermissionEntry {
    roles: string[];
    name: string;
    permission: IPermission;
}

export type PermissionConfig = IPermissionEntry[];