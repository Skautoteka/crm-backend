import express, { NextFunction, Request, Response } from 'express';
import * as moduleController from '../controller/module-controller';
import { RoleType } from '../interface/iauth';


const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const routes = moduleController.getModuleRoutes(RoleType.Admin);
        res.json(routes);
    } catch (err) {
        return next(err);
    }
})

export { router as moduleRouter }