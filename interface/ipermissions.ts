export interface IPermission {
    read: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
}

export interface IPermissionEntry {
    role: string;
    resource: string;
    permission: IPermission;
}

export type PermissionConfig = IPermissionEntry[];