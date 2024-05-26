import Role from "../db/models/role.model";
import User, { UserCreationAttributes } from "../db/models/user.model";
import { ModelValidationError } from "../error/model-validation";
import * as roleController from "./role-controller";

/**
 * Retrieves all users from the system.
 *
 * @returns
 */
export const getAll = async (): Promise<User[]> => {
  return await User.findAll({ include: [Role] });
};

/**
 * Adds a new user to the system.
 *
 * @param param0
 * @returns
 */
export const add = async ({ firstName, lastName }: UserCreationAttributes): Promise<User> => {
  if (!firstName || !lastName) {
    throw new Error();
  }

  try {
    const user = new User({
      firstName,
      lastName,
    });

    const role = await roleController.getBasicRole();
    user.roleId = role.id;
    return await user.save();
  } catch (err) {
    throw new ModelValidationError(err.message);
  }
};
