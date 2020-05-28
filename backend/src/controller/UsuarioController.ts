import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Usuario} from "../entity/Usuario";
import {UserType} from "./../Utilities";

export class UsuarioController {

  private userRepository = getRepository(Usuario);

  async one(request: Request, response: Response, next: NextFunction){
    this.userRepository.findOne(request.param('id')).then(result => {
      if(!result){
        return response.sendStatus(404);
      }
      return response.status(200).json(result);
    }).catch(error => {
      return response.sendStatus(500);
    });
  }

  async getProviderUsers(request: Request, response: Response, next: NextFunction){
    return this.userRepository.find({where: {tipoUsuario: UserType.Proveedor}});
  }

}
