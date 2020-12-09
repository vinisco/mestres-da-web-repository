import { Request, Response } from "express";

import UserService from "../services/UserService";

export default class UsersController {
  public async createUser(req: Request, res: Response): Promise<Response> {
    const { name, email, password, role } = req.body;

    const createUser = new UserService();

    const user = await createUser.execute({
      name: name,
      email: email,
      password: password,
      role: role,
    });

    user.password = "nothing to be shown";

    return res.json(user);
  }
}
