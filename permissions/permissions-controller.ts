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
        if (
            (req.hostname === 'localhost' || req.hostname === '127.0.0.1') &&
            //@ts-expect-error anyway
            req.headers.host.split(':')[1] !== '4200'
        ) {
            return next()
        }
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
