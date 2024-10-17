import express, { NextFunction, Request, Response } from 'express'
import * as playerController from '../controller/player-controller'
import { InvalidPayloadError } from '../error/invalid-payload'

const router = express.Router()

router.get('/all', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const players = await playerController.getAll()
        return res.json(players)
    } catch (err) {
        return next(err)
    }
})

router.delete(
    '/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        try {
            await playerController.remove(id);
            return res.json({ success: true })
        } catch (err) {
            return next(err)
        }
    }
)

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const player = await playerController.add(req.body)
        res.json({ success: true, added: player })
    } catch (err) {
        return next(err)
    }
})

router.get(
    '/create-fields',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const fields = await playerController.getTaskCreateFields()
            return res.json(fields)
        } catch (err) {
            return next(err)
        }
    }
)

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

            const teams = await playerController.queryPlayer(search, Number(size || 5))
            return res.json(teams)
        } catch (err) {
            return next(err)
        }
    }
)

export { router as playerRouter }
