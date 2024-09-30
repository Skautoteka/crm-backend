import User from "../db/models/user.model";
import { ModelValidationError } from "../error/model-validation";

/**
 * Creates the user to the database.
 * 
 * @param firstName 
 * @param lastName 
 * @returns 
 */
export const createUser = async (firstName: string, lastName: string): Promise<User> => {
    try {
        const user = new User({ firstName, lastName });
        return await user.save();
    } catch(err) {
        throw new ModelValidationError(err.message);
    }
}