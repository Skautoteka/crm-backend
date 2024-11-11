import express, { NextFunction, Request, Response } from 'express';
import * as moduleController from '../controller/module-controller';
import * as authController from '../controller/auth-controller';


const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const role = authController.getReqRole(req);
        const routes = moduleController.getModuleRoutes(role);
        res.json(routes);
    } catch (err) {
        return next(err);
    }
})

export { router as moduleRouter }