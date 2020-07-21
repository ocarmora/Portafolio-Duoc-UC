import {getRepository, Not} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Usuario} from "../entity/Usuario";
import {UserType, firstLetterCapitalize} from "./../Utilities";
import { TipoUsuario } from "../entity/TipoUsuario";
import * as bcrypt from "bcrypt";
import { OrdenDeCompra } from "../entity/OrdenDeCompra";

export class UsuarioController {

  private userRepository = getRepository(Usuario);
  private userRolesRepository = getRepository(TipoUsuario);

  async one(request: Request, response: Response, next: NextFunction){
    this.userRepository.findOne(request.param('id'), {relations: ['tipoUsuario']}).then(result => {
      if(!result){
        return response.sendStatus(404);
      }
      return response.status(200).json(result);
    }).catch(error => {
      return response.sendStatus(500);
    });
  }

  async getCustomerDetail(request: Request, response: Response, next: NextFunction){

    const rut = request.params.rut;

    const customer = await this.userRepository.findOne({
      where: [
        {rut: rut, tipoUsuario: UserType.Empresa},
        {rut: rut, tipoUsuario: UserType.Cliente}
      ]
    });

    if(!customer){
      response.sendStatus(404);
      return;
    }

    const obj = {
      id: customer.id,
      rut: customer.rut,
      detalle: customer.detalle
    }

    response.status(200).json(obj);
  }

  async getProviderUsers(request: Request, response: Response, next: NextFunction){
    return this.userRepository.find({where: {tipoUsuario: UserType.Proveedor, activo: 1}});
  }

  async getRoles(request: Request, response: Response, next: NextFunction){
    return this.userRolesRepository.find();
  }

  async create(request: Request, response: Response, next: NextFunction){

    let userDetail: any;
    let newUser: any;

    if(request.body.role.id == 1 || request.body.role.id == 2 || request.body.role.id == 3 || request.body.role.id == 5){
      userDetail = {
        nombre: request.body.name,
        segundoNombre: request.body.secondName,
        apellido: request.body.lastName,
        segundoApellido: request.body.secondLastName
      }
    }else{
      userDetail = {
        nombre: request.body.companyName,
        direccion: request.body.address,
        comuna: request.body.province,
        telefono: request.body.phone,
        email: request.body.email,
        personaContacto: request.body.contactPerson,
      }
    }

    newUser = {
      rut: request.body.rut,
      password: await bcrypt.hash(request.body.password, 12).then(result => result),
      tipoUsuario: request.body.role,
      habilitado: request.body.canLogin,
      detalle: userDetail
    }

    return this.userRepository.save(newUser);
  }

  async getAll(request: Request, response: Response, next: NextFunction){
    let result = [];
    const users: any = await this.userRepository
      .createQueryBuilder('u')
      .leftJoinAndSelect('u.tipoUsuario', 'tU')
      .where("tU.id != '2' AND tU.id != '4' AND tU.id != '6'")
      .andWhere("u.activo = '1'")
      .getMany()

    users.forEach(element => {
      let obj = {
        id: element.id,
        rut: element.rut,
        nombre: element.detalle.nombre,
        apellido: element.detalle.apellido ? element.detalle.apellido : null,
        tieneAcceso: element.habilitado,
        tipoUsuario: firstLetterCapitalize(element.tipoUsuario.tipo)
      }

      result.push(obj);
    });

    response.status(200).json(result);
  }

  async edit(request: Request, response: Response, next: NextFunction){
    const userId = request.body.id;
    let user = await this.userRepository.findOne(userId);
    user.rut = request.body.rut;
    user.tipoUsuario = request.body.role;
    user.habilitado = request.body.canLogin;

    if(request.body.password){
      user.password = await bcrypt.hash(request.body.password, 12).then(result => result)
    }

    if(request.body.role.id == 1 || request.body.role.id == 2 || request.body.role.id == 3 || request.body.role.id == 5){
      user.detalle = {
        nombre: request.body.name,
        segundoNombre: request.body.secondName,
        apellido: request.body.lastName,
        segundoApellido: request.body.secondLastName
      }
    }else{
      user.detalle = {
        nombre: request.body.companyName,
        direccion: request.body.address,
        comuna: request.body.province,
        telefono: request.body.phone,
        email: request.body.email,
        personaContacto: request.body.contactPerson,
      }
    }

    return await this.userRepository.save(user);
  }

  async deleteUser(request: Request, response: Response, next: NextFunction){
    const userId = request.params.id;
    let user = await this.userRepository.findOne(userId);
    user.activo = 0;
    return await this.userRepository.save(user);
  }

  async providerDetail(request: Request, response: Response, next: NextFunction){
    let result: any = {};
    const id = request.params.id;
    const data: any =  await this.userRepository
      .createQueryBuilder("p")
      .leftJoinAndSelect(OrdenDeCompra, "o", "o.proveedorId = p.id")
      .where("p.id = :id", { id: id })
      .orderBy("o.id", "DESC")
      .getRawMany();

    for (let index = 0; index < data.length; index++) {
      const element = data[index];

      if(index == 0){
        const detalle = JSON.parse(element.p_detalle);
        result.id = element.p_id;
        result.rut = element.p_rut;
        result.razonSocial = detalle.nombre;
        result.direccion = detalle.direccion;
        result.comuna = detalle.comuna;
        result.telefono = detalle.telefono;
        result.email = detalle.email;
        result.personaContacto = detalle.personaContacto;
        result.ordenesDeCompra = [];
      }

      if(element.o_id){
        let order = {
          id: element.o_id,
          comentario: element.o_comentario,
          metodoDePago: firstLetterCapitalize(element.o_metodoDePago),
          status: element.o_activo,
          pagoFactura: element.o_pagoFacturaDias
        }
        result.ordenesDeCompra.push(order);
      }
    }
    response.status(200).json(result);
  }

}
