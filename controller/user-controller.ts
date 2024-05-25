import User, { UserCreationAttributes } from "../db/models/user.model";

export const getAll = async (): Promise<User[]> => {
  return await User.findAll();
};

export const add = async ({ firstName, lastName }: UserCreationAttributes): Promise<User> => {
  if (!firstName || !lastName) {
    throw new Error();
  }

  const user = new User({ firstName, lastName });
  return await user.save();
};
