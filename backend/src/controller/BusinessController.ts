import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import { DatosEmpresa } from "../entity/DatosEmpresa";
import { join } from "path";

export class BusinessController {

  private repository = getRepository(DatosEmpresa);

  async detail(request: Request, response: Response, next: NextFunction){
    this.repository.findOne({
      where: {
        activo: 1
      },
      relations: [
        'comuna'
      ]
    }).then(result => {
        if(!result){
          return response.status(401).json({
            message: 'You must register your company information'
          });
        }
        return response.status(200).json(result);
      })
      .catch(error => {
        return response.status(500).json(error);
      });
  }
}
