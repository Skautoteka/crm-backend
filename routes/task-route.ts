import express, { NextFunction, Request, Response } from 'express'
import * as taskController from '../controller/task-controller'
import * as authController from '../controller/auth-controller'
import { routePermission } from '../permissions'
import {
    CREATE_PERMISSIONS,
    MODULE_PERMISSIONS,
    READ_PERMISSIONS,
    REMOVE_PERMISSIONS,
} from '../permissions/task'

const router = express.Router()

router.use(routePermission(MODULE_PERMISSIONS))

router.get(
    '/create-fields',
    routePermission(CREATE_PERMISSIONS),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const fields = await taskController.getTaskCreateFields()
            return res.json(fields)
        } catch (err) {
            return next(err)
        }
    }
)

router.get(
    '/all',
    routePermission(READ_PERMISSIONS),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await taskController.getAll()
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
            await taskController.remove(id)
            return res.json({ success: true })
        } catch (err) {
            return next(err)
        }
    }
)

router.post(
    '/',
    routePermission(CREATE_PERMISSIONS),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const payload = req.body
            const user = await authController.getReqUser(req)
            const task = await taskController.add(payload, user)
            res.json({ success: true, added: task })
        } catch (err) {
            return next(err)
        }
    }
)

export { router as taskRouter }
