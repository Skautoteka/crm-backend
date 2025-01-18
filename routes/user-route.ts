import express, { NextFunction, Request, Response } from 'express'
import * as userController from '../controller/user-controller'
import * as authController from '../controller/auth-controller'
import { InvalidPayloadError } from '../error/invalid-payload'
import { routePermission } from '../permissions'
import {
    CREATE_PERMISSIONS,
    EDIT_PERMISSIONS,
    MODULE_PERMISSIONS,
    READ_PERMISSIONS,
    REMOVE_PERMISSIONS,
} from '../permissions/user'
import { NotFoundError } from '../error/not-found'
import { UploadedFile } from 'express-fileupload'
import path from 'path'

const router = express.Router()

router.use(routePermission(MODULE_PERMISSIONS))

router.post(
    '/image/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const image = req.files?.image as UploadedFile
            const id = req.params['id'] + '.jpeg'

            if (!image) {
                throw new NotFoundError('Could not save not existing image')
            }

            if (image.mimetype !== 'image/jpeg') {
                throw new InvalidPayloadError(
                    'Cannot upload files other than jpeg'
                )
            }

            const uploadPath = path.join(__dirname, '../uploads', id)
            image.mv(uploadPath, (err) => {
                if (err) {
                    throw new InvalidPayloadError('Could not save image')
                }

                res.setHeader('Content-Type', 'application/json')
                res.json({ success: true })
            })
        } catch (err) {
            return next(err)
        }
    }
)

router.post(
    '/change-password',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { current, newPassword, confirmPassword } = req.body
            await userController.changePassword(
                req,
                current,
                newPassword,
                confirmPassword
            )

            res.json({ success: true })
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
            const users = await userController.getAll()
            return res.json(users)
        } catch (err) {
            return next(err)
        }
    }
)

router.get(
    '/create-fields',
    routePermission(CREATE_PERMISSIONS),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const fields = await userController.getUserCreateFields()
            return res.json(fields)
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

            const users = await userController.queryUsers(
                search,
                Number(size || 5)
            )
            return res.json(users)
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
            await userController.remove(id)
            return res.json({ success: true })
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

router.use('/images', express.static(path.join(__dirname, '../uploads')))

export { router as userRouter }
