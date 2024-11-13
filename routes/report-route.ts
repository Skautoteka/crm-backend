import express, { NextFunction, Request, Response } from 'express'
import * as reportController from '../controller/report-controller'
import * as authController from '../controller/auth-controller';
import { routePermission } from '../permissions';
import { MODULE_PERMISSIONS } from '../permissions/report';

const router = express.Router()

router.use(
    routePermission(MODULE_PERMISSIONS)
)

router.get(
    '/create-fields',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const fields = await reportController.getReportCreateFields()
            return res.json(fields)
        } catch (err) {
            return next(err)
        }
    }
)

router.get('/all', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await authController.getReqUser(req)
        const reports = await reportController.getAll(user)
        return res.json(reports)
    } catch (err) {
        return next(err)
    }
})

router.get('/all-detailed', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reports = await reportController.getAllDetailed();
        return res.json(reports)
    } catch (err) {
        return next(err);
    }
})

router.delete(
    '/:id',
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

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await authController.getReqUser(req)
        const team = await reportController.add(req.body, user)
        res.json({ success: true, added: team })
    } catch (err) {
        return next(err)
    }
})

export { router as reportRouter }
