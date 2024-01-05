import { Request, Response } from "express";
import { User } from "../user";

class Login{
  public async login(req: Request, res: Response){
    const {email, password} = req.body;

    try {
      const token = await new User().login(email, password);
      res.status(200).json(token);
    } catch (error:any) {
      res.status(401).json({error: error.message});
    }
  }
}

export const login = new Login().login;
