import express, { NextFunction, Request, Response } from 'express'
import * as taskController from '../controller/task-controller'
import * as authController from '../controller/auth-controller'
import { routePermission } from '../permissions'
import {
    CREATE_PERMISSIONS,
    EDIT_PERMISSIONS,
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

router.get(
    '/all-unassigned',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            return await taskController.getAllUnassigned()
        } catch (err) {
            return next(err)
        }
    }
)

router.post(
    '/assign',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userId, taskId } = req.body
            await taskController.assignTask(userId, taskId)

            res.json({ status: 'success' })
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

router.get('/permissions', async (req: Request, res: Response) => {
    const role = authController.getReqRole(req)

    res.json({
        read: READ_PERMISSIONS.includes(role),
        edit: EDIT_PERMISSIONS.includes(role),
        remove: REMOVE_PERMISSIONS.includes(role),
        create: CREATE_PERMISSIONS.includes(role),
    })
})

export { router as taskRouter }
