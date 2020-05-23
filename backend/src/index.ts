import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import {Routes} from "./routes";
import * as cors from "cors";
import * as morgan from "morgan";
import { Usuario } from "./entity/Usuario";
import { TipoUsuario } from "./entity/TipoUsuario";
import { Venta } from "./entity/Venta";
import CheckAuth from "./middleware/CheckAuth";

createConnection().then(async connection => {

  // create express app
  const app = express();
  app.use(bodyParser.json());
  app.use(cors()); // cors allows to send request from another server
  app.use(morgan('dev')); // check all request and show on console
  app.use(CheckAuth); // check if headers request has Bearer Token and if is valid with json web token

  // register express routes from defined application routes
  Routes.forEach(route => {
      (app as any)[route.method]('/api/' + route.route, (req: Request, res: Response, next: Function) => {
          const result = (new (route.controller as any))[route.action](req, res, next);
          if (result instanceof Promise) {
              result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

          } else if (result !== null && result !== undefined) {
              res.json(result);
          }
      });
  });

  // setup express app here
  // ...

  // start express server
  app.listen(3000);

  console.log("The backend (API) for FermeApp is now running on port 3000 (http://localhost:3000/)");

}).catch(error => console.log(error));
