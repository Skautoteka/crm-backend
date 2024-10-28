import { Request, Response, NextFunction } from 'express'
import { ForbiddenError } from '../error/forbidden';
import dotenv from 'dotenv'
import { NotFoundError } from '../error/not-found';
import jwt from 'jsonwebtoken';

dotenv.config()

// eslint-disable-next-line
export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (req.hostname === 'localhost' || req.hostname === '127.0.0.1') {
        return next();
    }

    const accessToken = req.cookies['sktka-access-token'];

    try {
        if(!accessToken) {
            throw new ForbiddenError('Unknown user with tokens');
        }
    
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
        if(!accessTokenSecret) {
            throw new NotFoundError('Could not find access token secret');
        }

        //@ts-expect-error email on jwt payload
        const { email } = await jwt.verify(accessToken, accessTokenSecret);

        // @ts-expect-error set user
        req.email = email;
        return next();
    } catch {
        return next(new ForbiddenError('Could not authenticate user'));
    }

}