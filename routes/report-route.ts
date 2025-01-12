import express, { NextFunction, Request, Response } from 'express'
import * as reportController from '../controller/report-controller'
import * as authController from '../controller/auth-controller'
import { routePermission } from '../permissions'
import {
    CREATE_PERMISSIONS,
    EDIT_PERMISSIONS,
    MODULE_PERMISSIONS,
    READ_PERMISSIONS,
    REMOVE_PERMISSIONS,
} from '../permissions/report'

const router = express.Router()

//router.use(routePermission(MODULE_PERMISSIONS))

router.get(
    '/create-fields',
    routePermission(CREATE_PERMISSIONS),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const fields = await reportController.getReportCreateFields()
            return res.json(fields)
        } catch (err) {
            return next(err)
        }
    }
)

router.get(
    '/get-fields/:id',
    routePermission(READ_PERMISSIONS),
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params

        try {
            const fields = await reportController.getReportFields(id)
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
            const user = await authController.getReqUser(req)
            let reports = []
            if (user.role.id === 'ADMIN') {
                reports = await reportController.getAll()
            } else {
                reports = await reportController.getAll(user)
            }
            return res.json(reports)
        } catch (err) {
            return next(err)
        }
    }
)

router.get(
    '/all-detailed',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const reports = await reportController.getAllDetailed()
            return res.json(reports)
        } catch (err) {
            return next(err)
        }
    }
)

router.get(
    '/allByTaskId/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        const { id: taskId } = req.params
        try {
            const reports = await reportController.getAllByTaskId(taskId)
            return res.json(reports)
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
            await reportController.remove(id)
            return res.json({ success: true })
        } catch (err) {
            return next(err)
        }
    }
)

router.post(
    '/add',
    routePermission(CREATE_PERMISSIONS),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await authController.getReqUser(req)
            const report = await reportController.add(req.body, user)
            res.json({ success: true, added: report })
        } catch (err) {
            return next(err)
        }
    }
)

router.post(
    '/update',
    routePermission(EDIT_PERMISSIONS),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            // const user = await authController.getReqUser(req)
            const report = await reportController.updateReportWithDetails(
                req.body
            )
            res.json({ success: true, updated: report })
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

export { router as reportRouter }
