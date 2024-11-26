import express, { NextFunction, Request, Response } from 'express'
import * as positionController from '../controller/position-controller'
import { InvalidPayloadError } from '../error/invalid-payload'

const router = express.Router()

router.get('/all', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const positions = await positionController.getAll()
        return res.json(positions)
    } catch (err) {
        return next(err)
    }
})

router.get(
    '/search',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { search, size } = req.query

            if (!search) {
                throw new InvalidPayloadError('Size or search not specified')
            }

            if (typeof search !== 'string') {
                throw new InvalidPayloadError('Invalid type of search or size')
            }

            const positions = await positionController.queryPositions(
                search,
                Number(size || 5)
            )
            return res.json(positions)
        } catch (err) {
            return next(err)
        }
    }
)

export { router as positionRouter }
