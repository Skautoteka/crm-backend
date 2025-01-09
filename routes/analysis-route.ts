import express, { Request, Response } from 'express'
import * as analysisController from '../controller/analysis-controller'
import { NotFoundError } from '../error/not-found'

const router = express.Router()

router.get('/get-report-filters', async (req: Request, res: Response) => {
    const filters = await analysisController.getReportFilters()

    res.json({ filters })
})

router.get('/get-note-filters', async (req: Request, res: Response) => {
    const filters = await analysisController.getNoteFilters()

    res.json({ filters })
})

router.post('/analyze-report', async (req: Request, res: Response) => {
    try {
        const { filters, playerId, regionId } = req.body
        const analysis = await analysisController.sendAnalysis(
            filters,
            playerId,
            regionId
        )
        res.json(analysis)
    } catch (err) {
        throw new NotFoundError('Could not find analysis. Something went wrong')
    }
})

export { router as analysisRouter }
