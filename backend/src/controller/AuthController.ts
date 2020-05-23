import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Usuario} from "../entity/Usuario";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export class AuthController {

    private secretTokenKey = 'jVVZgzfNc2Ho38JQxb5GsrlKXILuW1DkEJI8dJC7CsiqyQWj2zMIHX387pUgv9oMG95PNdcN4EDG1RsEYCrccmQgIX';
    private userRepository = getRepository(Usuario);

    validateToken(request: Request, response: Response, nex: NextFunction): boolean{
      try {
        jwt.verify(request.body.token, this.secretTokenKey);
        return true;
      } catch {
        return false;
      }
    }

    async currentUser(request: Request, response: Response, next: NextFunction){
      try {
        jwt.verify(request.body.token, this.secretTokenKey, (error: any, payload: any) => {
          if(error){
            return response.sendStatus(500).end();
          }else{
            this.userRepository.findOne(payload.id, {relations: ["tipoUsuario"]}).then(user =>{
              if(user){
                return response.status(200).json(user)
              }else{
                return response.sendStatus(500).end();
              }
            })
          }
        })
      } catch {
        return response.sendStatus(500).end();
      }
    }

    async login(request: Request, response: Response, next: NextFunction) {

      let userRut = request.body.rut;
      let userPassword = request.body.password;
      let token: string;

      this.userRepository.findOneOrFail({ where: {rut: userRut, activo: 1} })
        .then(user => {
          bcrypt.compare(userPassword, user.password)
          .then(result => {
            if(result){
              token = jwt.sign({rut: user.rut,id: user.id}, this.secretTokenKey);
              return response.status(200).json({
                token
              });
            }
            return response.status(401).end();
          })
        }).catch(err => {
          return response.status(500).end();
        });
    }

}
