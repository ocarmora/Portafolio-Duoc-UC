import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {MetodoPago} from "./../entity/MetodoPago";

export class PaymentMethodController {

  private repository = getRepository(MetodoPago);

  async getAll(request: Request, response: Response, next: NextFunction){
    return this.repository.find({where: {activo: 1}});
  }

}
