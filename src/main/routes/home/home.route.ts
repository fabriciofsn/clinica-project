import { Request, Response } from "express";

class Home{
  public home(req: Request, res: Response){
    res.json({"message": 'Home Page'});
  }
}

export const homepage = new Home().home;
