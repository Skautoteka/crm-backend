import express, { NextFunction, Request, Response } from 'express'
import * as userController from '../controller/user-controller'
import { InvalidPayloadError } from '../error/invalid-payload'
import { routePermission } from '../permissions'
import { CREATE_PERMISSIONS, MODULE_PERMISSIONS, READ_PERMISSIONS, REMOVE_PERMISSIONS } from '../permissions/user'

const router = express.Router()

router.use(
    routePermission(MODULE_PERMISSIONS)
)

router.get('/all', routePermission(READ_PERMISSIONS), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userController.getAll()
        return res.json(users)
    } catch (err) {
        return next(err)
    }
})

router.get(
    '/create-fields',
    routePermission(CREATE_PERMISSIONS),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const fields = await userController.getUserCreateFields()
            return res.json(fields)
        } catch (err) {
            return next(err)
        }
    }
)

router.get(
    '/search',
    routePermission(READ_PERMISSIONS),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { search, size } = req.query

            if (!search) {
                throw new InvalidPayloadError('Size or search not specified')
            }

            if (typeof search !== 'string') {
                throw new InvalidPayloadError('Invalid type of search or size')
            }

            const users = await userController.queryUsers(
                search,
                Number(size || 5)
            )
            return res.json(users)
        } catch (err) {
            return next(err)
        }
    }
)

router.delete(
    '/:id',
    routePermission(REMOVE_PERMISSIONS),
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        try {
            await userController.remove(id)
            return res.json({ success: true })
        } catch (err) {
            return next(err)
        }
    }
)

export { router as userRouter }
