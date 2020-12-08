import { Request, Response } from "express";

import CreateUserService from "../services/CreateUserService";

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password, isAdmin } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name: name,
      email: email,
      password: password,
      isAdmin: isAdmin,
    });

    user.password = "nothing to be shown";

    return res.json(user);
  }
}
