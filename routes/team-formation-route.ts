import express, { NextFunction, Request, Response } from 'express'
import * as teamFormationController from '../controller/team-formation-controller'
import { InvalidPayloadError } from '../error/invalid-payload'

const router = express.Router()

router.get('/all', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const teamFormations = await teamFormationController.getAll()
        return res.json(teamFormations)
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

            const teamFormations =
                await teamFormationController.queryTeamFormation(
                    search,
                    Number(size || 5)
                )
            return res.json(teamFormations)
        } catch (err) {
            return next(err)
        }
    }
)

export { router as teamFormationsRouter }
