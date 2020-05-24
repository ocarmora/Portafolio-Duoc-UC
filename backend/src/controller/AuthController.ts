import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Usuario} from "../entity/Usuario";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export class AuthController {

    private tokenSecretKey = process.env.TOKEN_SECRET_KEY;
    private userRepository = getRepository(Usuario);

    async validateToken(request: Request, response: Response, nex: NextFunction){
      jwt.verify(request.body.token, this.tokenSecretKey, (error: any) => {
        if(error){
          return response.status(403).send(false);
        }
        return response.status(200).send(true);
      })
    }

    async currentUser(request: Request, response: Response, next: NextFunction){
      jwt.verify(request.body.token, this.tokenSecretKey, (error: any, payload: any) => {
        if(error){
          return response.sendStatus(500);
        }else{
          this.userRepository.findOne(payload.id, {relations: ["tipoUsuario"]}).then(user =>{
            if(user){
              return response.status(200).json(user)
            }else{
              return response.sendStatus(500);
            }
          })
        }
      })
    }

    async login(request: Request, response: Response, next: NextFunction) {

      let username = request.body.username;
      let password = request.body.password;
      let token: string;
      let userFound: any;

      this.userRepository.findOneOrFail({ where: {rut: username, activo: 1}, relations: ["tipoUsuario"]})
        .then(user => {
          userFound = user;
          bcrypt.compare(password, user.password)
            .then(result => {
              if(!result){
                return response.sendStatus(401);
              }
              //this.currentUser = userFound;
              token = jwt.sign({rut: user.rut,id: user.id}, this.tokenSecretKey);
              return response.status(200).json({
                user: userFound,
                token: token
              });
            })
            .catch(err => {
              return response.sendStatus(500);
            })
        }).catch(err => {
          return response.sendStatus(500);
        });
    }

}
