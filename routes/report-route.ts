import express, { NextFunction, Request, Response } from 'express'
import * as reportController from '../controller/report-controller'

const router = express.Router()

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
        const teams = await reportController.getAll()
        return res.json(teams)
    } catch (err) {
        return next(err)
    }
})

router.get(
    '/all/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        const { id: taskId } = req.params
        try {
            const reports = await reportController.getAllByTaskId(taskId)
            console.log('reports', reports)
            return res.json(reports)
        } catch (err) {
            return next(err)
        }
    }
)

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
        const team = await reportController.add(req.body)
        res.json({ success: true, added: team })
    } catch (err) {
        return next(err)
    }
})

export { router as reportRouter }
