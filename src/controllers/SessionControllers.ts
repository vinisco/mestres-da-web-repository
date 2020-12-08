import { Request, Response } from "express";

import AuthenticateSessionService from "../services/AuthenticateSessionService";

export default class SessionController {
  public async postSession(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const authenticateSession = new AuthenticateSessionService();

      const { user, token } = await authenticateSession.execute({
        email: email,
        password: password,
      });

      user.password = "nothing to be shown";

      return res.json({ user, token });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}
