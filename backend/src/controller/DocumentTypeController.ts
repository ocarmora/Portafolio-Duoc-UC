import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {TipoDocumento} from "../entity/TipoDocumento";

export class DocumentTypeController {

  private repository = getRepository(TipoDocumento);

  async all(request: Request, response: Response, next: NextFunction){
    return this.repository.find({
      where: {
        activo: 1
      }
    });
  }
}
