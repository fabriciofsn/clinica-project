import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface User {
  id: string;
  username: string;
}

export class AuthService{
  private static SECRET = process.env.JWT_SECRET!;

  static gererateToken(user: {email: string}): string{
    return jwt.sign(user, AuthService.SECRET, {expiresIn: '10d'});
  }

  static authenticateToken(req: Request, res: Response, next: NextFunction){
    const token = req.headers["authorization"];

    if(!token) {
      res.sendStatus(401);
      return;
    }

    const userToken = token.split(" ")[1];
    jwt.verify(userToken, AuthService.SECRET, (err: any, user: any) =>{
      if(err){
        res.sendStatus(401);
        return;
      }

      (req as Request & { user: User }).user = user;
      next();
    })
  }
}