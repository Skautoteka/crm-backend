import express, { NextFunction, Request, Response } from 'express'
import * as teamController from '../controller/team-controller'
import { InvalidPayloadError } from '../error/invalid-payload'

const router = express.Router()

router.get(
    '/create-fields',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const fields = await teamController.getTeamCreateFields()
            return res.json(fields)
        } catch (err) {
            return next(err)
        }
    }
)

router.get('/all', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const teams = await teamController.getAll()
        return res.json(teams)
    } catch (err) {
        return next(err)
    }
})

router.delete(
    '/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        try {
            await teamController.remove(id)
            return res.json({ success: true })
        } catch (err) {
            return next(err)
        }
    }
)

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, city, country, league } = req.body
        const team = await teamController.add({ name, city, country, league })
        res.json({ success: true, added: team })
    } catch (err) {
        return next(err)
    }
})

router.get(
    '/search',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { search, size } = req.query;
            
            if (!search) {
                throw new InvalidPayloadError('Size or search not specified')
            }

            if (typeof search !== 'string') {
                throw new InvalidPayloadError('Invalid type of search or size')
            }

            const teams = await teamController.queryTeams(search, Number(size || 5))
            return res.json(teams)
        } catch (err) {
            return next(err)
        }
    }
)

export { router as teamRouter }
