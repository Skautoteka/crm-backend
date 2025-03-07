import { RoleType } from '../interface/iauth'
import { PermissionConfig } from '../interface/ipermissions'

/**
 * Roles that are allowed to view the module in general
 */
export const MODULE_PERMISSIONS: PermissionConfig = [
    RoleType.Admin,
    RoleType.Analytics,
    RoleType.RegionManager,
    RoleType.Scout,
    RoleType.SportsDirector,
]

/**
 * Roles that are allowed to read records
 */
export const READ_PERMISSIONS: PermissionConfig = [
    RoleType.Admin,
    RoleType.Analytics,
    RoleType.RegionManager,
    RoleType.Scout,
    RoleType.SportsDirector,
]

/**
 * Roles that are allowed to edit records
 */
export const EDIT_PERMISSIONS: PermissionConfig = [
    RoleType.Admin,
    RoleType.Analytics,
    RoleType.RegionManager,
    RoleType.Scout,
    RoleType.SportsDirector,
]

/**
 * Roles that are allowed to remove records
 */
export const REMOVE_PERMISSIONS: PermissionConfig = [
    RoleType.Admin,
    RoleType.RegionManager,
    RoleType.SportsDirector,
]

/**
 * Roles that are allowed to create records
 */
export const CREATE_PERMISSIONS: PermissionConfig = [
    RoleType.Admin,
    RoleType.RegionManager,
    RoleType.SportsDirector,
]
