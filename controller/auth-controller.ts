import User from "../db/models/user.model";
import bcrypt from 'bcrypt';
import { ModelValidationError } from "../error/model-validation";

/**
 * Creates the user to the database.
 * 
 * @param firstName 
 * @param lastName 
 * @returns 
 */
export const createUser = async (firstName: string, lastName: string, email: string, password: string): Promise<User> => {
    try {
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound)
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ firstName, lastName, email, password: hashedPassword });
        return await user.save();
    } catch(err) {
        throw new ModelValidationError(err.message);
    }
}

/**
 * Tries to log in the user to the system.
 * 
 * @param email 
 * @param password 
 */
export const login = async (email: string, password: string): Promise<boolean> => {
    const user = await User.findOne({ where: { email } });
    console.log(user, password);

    return false;
}