import { Request, Response, NextFunction } from 'express'
import * as authController from '../controller/auth-controller'
import { PermissionConfig } from '../interface/ipermissions'
import { UnauthorizedError } from '../error/unauthorized'

/**
 * Sets the permission for the route
 *
 * @param config
 * @returns
 */
export const routePermission = (config: PermissionConfig) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const role = authController.getReqRole(req)

        if (!config.includes(role)) {
            return next(
                new UnauthorizedError(
                    `Cannot perform action on this module as "${role}"`
                )
            )
        }

        return next()
    }
}
