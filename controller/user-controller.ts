import Role from "../db/models/role.model";
import User, { UserCreationAttributes } from "../db/models/user.model";
import { ModelValidationError } from "../error/model-validation";
import * as roleController from "./role-controller";

export const getAll = async (): Promise<User[]> => {
  return await User.findAll({ include: [Role] });
};

export const add = async ({ firstName, lastName }: UserCreationAttributes): Promise<User> => {
  if (!firstName || !lastName) {
    throw new Error();
  }

  try {
    const user = await User.create({
      firstName,
      lastName,
    });
    user.role = await roleController.getBasicRole();
    return await user.save();
  } catch (err) {
    throw new ModelValidationError(err.message);
  }
};
