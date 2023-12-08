import bodyParser from "body-parser";
import Express from "express";
import { router } from "main/routes/index";

export class Server {
  public app: Express.Application;

  constructor(){
    this.app = Express();
    this.middlewares();
    this.routes();
  }

  private middlewares(){
    this.app.use(Express.json());
    this.app.use(bodyParser.urlencoded({extended: true}));
  }

  private routes(){
    this.app.use(router);
  }
}
