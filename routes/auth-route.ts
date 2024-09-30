import express, { NextFunction, Request, Response } from 'express';
import * as authController from '../controller/auth-controller';

const router = express.Router();

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { firstName, lastName } = req.body;
        authController.createUser(firstName, lastName);
    } catch (err) {
        return next(err);
    }
})

export { router as authRouter };