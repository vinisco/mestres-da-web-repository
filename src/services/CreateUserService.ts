import { getRepository } from "typeorm";
import { hash } from "bcryptjs";

import AppError from "../errors/AppError";

import User from "../models/User";

interface Request {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}
class CreateUserService {
  public async execute({
    name,
    email,
    password,
    isAdmin,
  }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkIfEmailExist = await userRepository.findOne({
      where: { email },
    });

    if (checkIfEmailExist) {
      throw new AppError(
        "User already registered with this email address",
        400
      );
    }

    if (isAdmin) {
      const checkIfRoleExist = await userRepository.findOne({
        where: { isAdmin },
      });

      if (checkIfRoleExist) {
        throw new AppError("User administrator is already registered", 401);
      }
    }
    const hashedPassword = await hash(password, 8);
    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
      isAdmin,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
