import express, { NextFunction, Request, Response } from 'express'
import * as playerController from '../controller/player-controller'

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

export { router as playerRouter }
