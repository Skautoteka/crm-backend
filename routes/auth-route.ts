import express, { NextFunction, Request, Response } from 'express';
import * as authController from '../controller/auth-controller';

const router = express.Router();

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const user = await authController.createUser(firstName, lastName, email, password);
        res.json({ success: true, added: user })
    } catch (err) {
        return next(err);
    }
})

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const result = await authController.login(email, password);
        console.log(result)
        res.json({ success: true });
    } catch (err) {
        return next(err)
    }
})

export { router as authRouter };