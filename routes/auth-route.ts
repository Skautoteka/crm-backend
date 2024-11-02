import express, { NextFunction, Request, Response } from 'express';
import * as authController from '../controller/auth-controller';
import { authMiddleware } from '../middleware/auth-middleware';
import { ForbiddenError } from '../error/forbidden';

const router = express.Router();

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { firstName, lastName, email, password } = req.body

        if (!firstName || !lastName || !email || !password) {
            throw new Error('Missing required fields')
        }

        console.log('Registration attempt:', { firstName, lastName, email })

        await authController.createUser(firstName, lastName, email, password)
        res.json({ success: true })
    } catch (err) {
        return next(err);
    }
})

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const tokens = await authController.login(email, password);

        res.cookie('sktka-access-token', tokens.accessToken);
        res.cookie('sktka-refresh-token', tokens.refreshToken);
        
        res.json({ success: true });
    } catch (err) {
        return next(err)
    }
})

router.get('/logout', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie('sktka-access-token');
        res.clearCookie('sktka-refresh-token');
        res.json({ success: true })
    } catch (err) {
        return next(err)
    }
})

router.get('/refresh-token', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies['sktka-refresh-token'];

        if(!token) {
            throw new ForbiddenError('Refresh token was not provided');
        }

        const { accessToken, refreshToken} = await authController.refreshToken(token);
        res.cookie('sktka-access-token', accessToken);
        res.cookie('sktka-refresh-token', refreshToken);

        res.json({ success: true });
    } catch (err) {
        return next(err);
    }
})

router.get('/get-user', authMiddleware, async (req: Request, res: Response) => {
    const user = await authController.getReqUser(req);
    res.json(user)
})

export { router as authRouter };