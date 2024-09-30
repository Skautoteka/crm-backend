import express, { NextFunction, Request, Response } from 'express'
import * as taskController from '../controller/task-controller'

const router = express.Router()

router.get(
    '/create-fields',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const fields = await taskController.getTaskCreateFields()
            return res.json(fields)
        } catch (err) {
            return next(err)
        }
    }
)

router.get('/all', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await taskController.getAll()
        return res.json(users)
    } catch (err) {
        return next(err)
    }
})

router.delete(
    '/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        try {
            await taskController.remove(id)
            return res.json({ success: true })
        } catch (err) {
            return next(err)
        }
    }
)

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await taskController.add()
        res.json({ success: true, added: user })
    } catch (err) {
        return next(err)
    }
})

export { router as taskRouter }
