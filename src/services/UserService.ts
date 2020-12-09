import { getRepository } from "typeorm";
import { hash } from "bcryptjs";

import ApplicationError from "../errors/ApplicationError";

import User from "../models/User";

interface Request {
  name: string;
  email: string;
  password: string;
  role: string;
}
class UserService {
  public async execute({
    name,
    email,
    password,
    role,
  }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkIfEmailExist = await userRepository.findOne({
      where: { email },
    });

    if (checkIfEmailExist) {
      throw new ApplicationError(
        "User already registered with this email address",
        400
      );
    }

    if (role === "administer") {
      const checkIfRoleExist = await userRepository.findOne({
        where: { role },
      });

      if (checkIfRoleExist) {
        throw new ApplicationError(
          "User administer is already registered",
          401
        );
      }
    }
    const hashedPassword = await hash(password, 8);
    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await userRepository.save(user);

    return user;
  }
}

export default UserService;
