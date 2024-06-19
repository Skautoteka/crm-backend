import express, { NextFunction, Request, Response } from 'express'
import * as teamController from '../controller/team-controller'

const router = express.Router()

router.get(
    '/query',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            return await teamController.queryTeams()
        } catch (err) {
            return next(err)
        }
    }
)

export { router as teamRouter }
