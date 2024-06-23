import express, { NextFunction, Request, Response } from 'express';
import * as playerController from '../controller/player-controller';

const router = express.Router()

router.get('/all', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const players = await playerController.getAll();
        return res.json(players)
    } catch (err) {
        return next(err);
    }
})

