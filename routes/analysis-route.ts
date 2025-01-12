import express, { NextFunction, Request, Response } from 'express'
import * as analysisController from '../controller/analysis-controller'

const router = express.Router()

router.get('/get-report-filters', async (req: Request, res: Response) => {
    const filters = await analysisController.getReportFilters()

    res.json({ filters })
})

router.get('/get-note-filters', async (req: Request, res: Response) => {
    const filters = await analysisController.getNoteFilters()

    res.json({ filters })
})

router.post(
    '/analyze-report',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { filters, playerId, regionId } = req.body
            const analysis = await analysisController.sendReportAnalysis(
                Object.entries(filters).map((entry) => {
                    const [key, obj] = entry
                    const { predicate, value } = obj as any

                    return { key, predicate, value }
                }),
                playerId,
                regionId
            )
            res.json(analysis)
        } catch (err) {
            return next(err)
        }
    }
)

router.post(
    '/analyze-note',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { filters, teamId } = req.body
            const analysis = await analysisController.sendNoteAnalysis(
                Object.entries(filters).map((entry) => {
                    const [key, obj] = entry
                    const { predicate, value } = obj as any

                    return { key, predicate, value }
                }),
                teamId
            )
            res.json(analysis)
        } catch (err) {
            return next(err)
        }
    }
)

export { router as analysisRouter }
