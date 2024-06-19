import express, { NextFunction, Request, Response } from 'express'
import * as teamController from '../controller/team-controller'
import { InvalidPayloadError } from '../error/invalid-payload'

const router = express.Router()

router.get('/all', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const teams = await teamController.getAll()
        return res.json(teams)
    } catch (err) {
        return next(err)
    }
})

router.get(
    '/search',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { size, search } = req.query
            if (!size || !search) {
                throw new InvalidPayloadError('Size or search not specified')
            }

            if (typeof size !== 'string' || typeof search !== 'string') {
                throw new InvalidPayloadError('Invalid type of search or size')
            }

            const teams = await teamController.queryTeams(search, Number(size))
            return res.json(teams)
        } catch (err) {
            return next(err)
        }
    }
)

export { router as teamRouter }
