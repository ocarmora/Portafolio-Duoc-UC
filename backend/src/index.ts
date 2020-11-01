import "reflect-metadata";
import {createConnection, getRepository} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import {Routes} from "./routes";
import * as cors from "cors";
import * as morgan from "morgan";
import CheckAuth from "./middleware/CheckAuth";
import {Usuario} from "./entity/Usuario";
import {TipoUsuario} from "./entity/TipoUsuario";
import * as bcrypt from "bcrypt";

createConnection().then(async connection => {


  // create express app
  const app = express();
  app.use(bodyParser.json());
  app.use(cors()); // cors allows to receive request from another server
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


  // create super admin role and admin user for the first login
  await getRepository(TipoUsuario).findOne(1).then(async result => {
      if(!result){

            // create admin role
            const role = await getRepository(TipoUsuario).save({
                tipo: 'admin',
                activo: 1
            });

            // create admin user
            const adminUser = {
                rut: 'admin',
                password: await bcrypt.hash('secret', 12).then(result => result),
                tipoUsuario: role,
                activo: 1,
                detalle: {
                    nombre: 'Super',
                    segundoNombre: 'Admin',
                    apellido: 'User',
                    segundoApellido: 'Role',
                    email: 'mail@example.com',
                    telefono: '+569823792031'
                }
            }

            await getRepository(Usuario).save(adminUser);
      }
  })

  // start express server
  app.listen(3000);

  console.log("The backend (API) for FermeApp is now running on port 3000 (http://localhost:3000/)");

}).catch(error => console.log(error));
