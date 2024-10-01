import User from "../db/models/user.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ModelValidationError } from "../error/model-validation";
import { NotFoundError } from "../error/not-found";
import dotenv from 'dotenv'
import { ForbiddenError } from "../error/forbidden";
import { Tokens } from "../interface/iauth";

dotenv.config()

/**
 * Generates hashed password from a password given as argument.
 * 
 * @param password 
 * @returns 
 */
const _getHashedPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
}


/**
 * Creates the user to the database.
 * 
 * @param firstName 
 * @param lastName 
 * @returns 
 */
export const createUser = async (firstName: string, lastName: string, email: string, password: string): Promise<User> => {
    try {
        const hashedPassword = await _getHashedPassword(password);
        const user = new User({ firstName, lastName, email, password: hashedPassword });
        return await user.save();
    } catch(err) {
        throw new ModelValidationError(err.message);
    }
}

/**
 * Tries to log in the user to the system. The value returned is a string representing
 * 
 * @param email 
 * @param password 
 */
export const login = async (email: string, password: string): Promise<Tokens> => {
    const user = await User.findOne({ where: { email } });

    if(!user) {
        throw new NotFoundError(`User of email ${email} was not found`);
    }

    const hashedPassword = await _getHashedPassword(password);
    if(hashedPassword !== user.password) {
        throw new ForbiddenError('Password is invalid');
    }

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    if(!accessTokenSecret) {
        throw new NotFoundError('Could not find access token secret');
    }

    const accessToken = jwt.sign(user.email, accessTokenSecret);
    return { accessToken, refreshToken: '' }
}