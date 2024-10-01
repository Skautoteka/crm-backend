import { Request, Response, NextFunction } from 'express'
import { ForbiddenError } from '../error/forbidden';
import dotenv from 'dotenv'
import { NotFoundError } from '../error/not-found';
import jwt from 'jsonwebtoken';

dotenv.config()

// eslint-disable-next-line
export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    if(!authHeader) {
        throw new ForbiddenError('Unknown user with no token as bearer token');
    }

    const [, token] = authHeader.split(' ');
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

    if(!token) {
        throw new ForbiddenError('Unknown user with no token as bearer token');
    }

    if(!accessTokenSecret) {
        throw new NotFoundError('Could not find access token secret');
    }

    jwt.verify(token, accessTokenSecret, (err, email) => {
        if(err) {
            throw new ForbiddenError('Could not be verified with the given token');
        }
        
        // @ts-expect-error request does not have userEmail field
        req.userEmail = email as string;
        next();
    });
}