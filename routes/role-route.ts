import express, { NextFunction, Request, Response } from 'express'
import * as roleController from '../controller/role-controller'
import { InvalidPayloadError } from '../error/invalid-payload'

const router = express.Router()

router.get('/all', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = await roleController.getAll()
        return res.json(roles)
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

            const roles = await roleController.queryRoles(
                search,
                Number(size || 5)
            )
            return res.json(roles)
        } catch (err) {
            return next(err)
        }
    }
)

export { router as roleRouter }
