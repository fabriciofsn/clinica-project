import bodyParser from "body-parser";
import cors from 'cors';
import Express from "express";
import helmet from "helmet";
import SwaggerUI from "swagger-ui-express";

import { router } from "main/routes/index";
import swaggerDocs from '../../swaggerDocs.json';

export class Server {
  public app: Express.Application;

  constructor(){
    this.app = Express();
    this.middlewares();
    this.routes();
  }

  private middlewares(){
    this.app.disable('x-powered-by')
    this.app.use(helmet());
    this.app.use(Express.json());
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.use(cors({
      origin: ['http://localhost:5173', 'http://127.0.0.1:5173','https://home-clinic-web-app.vercel.app'],
      optionsSuccessStatus: 200
    }));
  }

  private routes(){
    this.app.use(router);
    this.app.use('/api-docs', SwaggerUI.serve, SwaggerUI.setup(swaggerDocs));
  }
}
