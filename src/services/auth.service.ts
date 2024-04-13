import { type UserType } from '../types/user.type';
import { userModel } from '../models/user.model';
import { hash } from 'bcrypt';

export const createUser = async (payload: UserType) => {
  const hashedPassword = await hash(payload.password, 10);

  return await userModel.create({
    email: payload.email,
    name: payload.name,
    password: hashedPassword,
    profilePicture: payload.profilePicture
      ? payload.profilePicture
      : 'https://figma.com',
  });
};

export const findUser = async (email: string) => {
  return await userModel.findOne({
    email,
  });
};
