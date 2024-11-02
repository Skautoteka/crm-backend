import express, { NextFunction, Request, Response } from 'express'
import * as regionController from '../controller/region-controller'
import { InvalidPayloadError } from '../error/invalid-payload'

const router = express.Router()

router.get(
    '/search',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log('herer')
            const { search, size } = req.query

            if (!search) {
                throw new InvalidPayloadError('Size or search not specified')
            }

            if (typeof search !== 'string') {
                throw new InvalidPayloadError('Invalid type of search or size')
            }

            const regions = await regionController.queryRegions(
                search,
                Number(size || 5)
            )
            return res.json(regions)
        } catch (err) {
            return next(err)
        }
    }
)

export { router as regionRouter }
