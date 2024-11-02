import express, { NextFunction, Request, Response } from 'express'
import * as userController from '../controller/user-controller'

const router = express.Router()

router.get('/all', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userController.getAll()
        return res.json(users)
    } catch (err) {
        return next(err)
    }
})

router.get(
    '/create-fields',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const fields = await userController.getUserCreateFields()
            return res.json(fields)
        } catch (err) {
            return next(err)
        }
    }
)

export { router as userRouter }
