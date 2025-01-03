import express, { NextFunction, Request, Response } from 'express'
import * as teamController from '../controller/team-controller'
import * as authController from '../controller/auth-controller'
import { InvalidPayloadError } from '../error/invalid-payload'
import { routePermission } from '../permissions'
import {
    CREATE_PERMISSIONS,
    EDIT_PERMISSIONS,
    MODULE_PERMISSIONS,
    READ_PERMISSIONS,
    REMOVE_PERMISSIONS,
} from '../permissions/team'

const router = express.Router()

router.use(routePermission(MODULE_PERMISSIONS))

router.get(
    '/create-fields',
    routePermission(CREATE_PERMISSIONS),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const fields = await teamController.getTeamCreateFields()
            return res.json(fields)
        } catch (err) {
            return next(err)
        }
    }
)

router.get(
    '/all',
    routePermission(READ_PERMISSIONS),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const teams = await teamController.getAll()
            return res.json(teams)
        } catch (err) {
            return next(err)
        }
    }
)

router.delete(
    '/:id',
    routePermission(REMOVE_PERMISSIONS),
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

router.post(
    '/',
    routePermission(CREATE_PERMISSIONS),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, city, country, league } = req.body
            const team = await teamController.add({
                name,
                city,
                country,
                league,
            })
            res.json({ success: true, added: team })
        } catch (err) {
            return next(err)
        }
    }
)

router.get(
    '/search',
    routePermission(READ_PERMISSIONS),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { search, size } = req.query

            if (!search) {
                throw new InvalidPayloadError('Size or search not specified')
            }

            if (typeof search !== 'string') {
                throw new InvalidPayloadError('Invalid type of search or size')
            }

            const teams = await teamController.queryTeams(
                search,
                Number(size || 5)
            )
            return res.json(teams)
        } catch (err) {
            return next(err)
        }
    }
)

router.get('/permissions', async (req: Request, res: Response) => {
    const role = authController.getReqRole(req)

    res.json({
        read: READ_PERMISSIONS.includes(role),
        edit: EDIT_PERMISSIONS.includes(role),
        remove: REMOVE_PERMISSIONS.includes(role),
        create: CREATE_PERMISSIONS.includes(role),
    })
})

export { router as teamRouter }
