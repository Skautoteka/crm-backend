import express, { Request, Response } from 'express'
import * as analysisController from '../controller/analysis-controller'

const router = express.Router()

router.get(
    '/analysis/get-report-filters',
    async (req: Request, res: Response) => {
        const filters = await analysisController.getReportFilters()

        res.json({ filters })
    }
)

router.get(
    '/analysis/get-note-filters',
    async (req: Request, res: Response) => {
        const filters = await analysisController.getNoteFilters()

        res.json({ filters })
    }
)

export { router as analysisRouter }
