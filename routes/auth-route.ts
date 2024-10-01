import express, { NextFunction, Request, Response } from 'express';
import * as authController from '../controller/auth-controller';
import { InvalidPayloadError } from '../error/invalid-payload';

const router = express.Router();

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        await authController.createUser(firstName, lastName, email, password);
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
        res.json(tokens);
    } catch (err) {
        return next(err)
    }
})

router.post('/refresh-token', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req.body;
        if(!token) {
            throw new InvalidPayloadError('Refresh token was not provided');
        }

        const accessToken = await authController.refreshToken(token);

        res.cookie('sktka-access-token', accessToken);
        res.json({ success: true });
    } catch (err) {
        return next(err);
    }
})

export { router as authRouter };