import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {MetodoPagoVenta} from "./../entity/MetodoPagoVenta";
import { Usuario } from "../entity/Usuario";
import { UserType, firstLetterCapitalize } from "../Utilities";
import * as bcrypt from "bcrypt";
import * as Moment from "moment";
import { Documento } from "../entity/Documento";
import { DetalleDocumento } from "../entity/DetalleDocumento";
import { HistorialDocumento } from "../entity/HistorialDocumento";
import { Venta } from "../entity/Venta";
import { DetalleProducto } from "../entity/DetalleProducto";


export class SaleController {

  private paymentMethodRepository = getRepository(MetodoPagoVenta);
  private userRepository = getRepository(Usuario);
  private documentRepository = getRepository(Documento);
  private documentHistoryRepository = getRepository(HistorialDocumento);
  private documentDetailRepository = getRepository(DetalleDocumento);
  private sellRepository = getRepository(Venta);
  private inventoryRepository = getRepository(DetalleProducto);

  async getAll(request: Request, response: Response, next: NextFunction){
    let result = [];
    let fetched:any = await this.sellRepository
      .createQueryBuilder('s')
      .leftJoinAndSelect('s.documento', 'd')
      .leftJoinAndSelect('s.usuario', 'u')
      .leftJoinAndSelect('d.tipoDocumento', 'tD')
      .leftJoinAndSelect('d.cliente', 'c')
      .orderBy('s.id', 'DESC')
      .getRawMany();

    for (let index = 0; index < fetched.length; index++) {
      const element = fetched[index];
      const obj = {
        id: element.s_id,
        fecha: element.s_fecha,
        vendedor: JSON.parse(element.u_detalle).nombre + ' ' + JSON.parse(element.u_detalle).apellido,
        cliente: (element.tD_tipo == 'boleta') ? null : JSON.parse(element.c_detalle).nombre,
        status: element.s_activo,
        documento: {
          id: element.d_id,
          correlativo: element.d_correlativo,
          tipo: firstLetterCapitalize(element.tD_tipo),
          total: element.d_totalNeto
        }
      }

      result.push(obj);
    }

    response.status(200).send(result);
  }

  async getSalePaymentMethods(request: Request, response: Response, next: NextFunction){
    return this.paymentMethodRepository.find({where: {activo: 1}});
  }

  async makeSale(request: Request, response: Response, next: NextFunction){

    const data = request.body;
    const customerUser = data.customer;
    const products = data.products;
    let newUser: any;

    // If document type is 'boleta'
    if(data.documentType.tipo == 'boleta'){
      newUser = null;
    }else{
      // Create new user
      if(customerUser.id == 0){

        let newUserData: any = {
          rut: customerUser.rut,
          password: await bcrypt.hash(customerUser.rut.substring(0, 6), 12).then(result => result), // primeros 6 dígitos del rut
          tipoUsuario: UserType.Empresa,
          activo: 1,
          detalle: {
            nombre: customerUser.razonSocial,
            email: customerUser.correoElectronico,
            personaContacto: customerUser.personaContacto,
            telefono: customerUser.telefono,
            direccion: customerUser.direccion,
            comuna: customerUser.comuna
          }
        }
        newUser = await this.userRepository.save(newUserData);
      }
    }

    // Create document
    let correlativeFetched: any = await this.documentRepository.find({
      select: ['correlativo'],
      where: {
        tipoDocumento: data.documentType
      },
      order: {
          id: "DESC",
      },
      take: 1
    });

    let documentData: any = {
      correlativo: correlativeFetched.length > 0 ? correlativeFetched[0].correlativo + 1 : 1,
      fechaCreacion: Moment().format('DD/MM/YYYY'),
      totalNeto: products.total,
      tipoDocumento: data.documentType,
      cliente: (customerUser.id > 0) ? customerUser.id : newUser,
      activo: 1
    }

    const document = await this.documentRepository.save(documentData);

    // Create document detail
    products.products.forEach(async element => {
      let obj = {
        precioNeto: element.precioNeto,
        cantidad: element.cantidad,
        subtotalNeto: element.precioNeto * element.cantidad,
        producto: element.id,
        documento: document,
        activo: 1
      }

      await this.documentDetailRepository.save(obj);
    });

    // Create document history
    let historyData = {
      detalle: 'Hizo una nueva venta',
      fecha: Moment().format('DD/MM/YYYY'),
      usuario: data.currentUser,
      documento: document,
      activo: 1
    }

    await this.documentHistoryRepository.save(historyData);

    // Generate a sell
    let sellData = {
      fecha: Moment().format('DD/MM/YYYY'),
      usuario: data.currentUser,
      documento: document,
      activo: 1
    }

    await this.sellRepository.save(sellData);

    // Update inventory
    products.products.forEach(async element => {

      if(!element.tieneVencimiento){
        let product = await this.inventoryRepository.findOne({where: {producto: element.id}});
        product.stock = product.stock - element.cantidad;
        await this.inventoryRepository.save(product);
      }else{

        // Get products detail (inventory)
        let productsFetched = await this.inventoryRepository.find({where: {producto: element.id}});

        // Order products array. Sort ASC by date
        productsFetched.sort(function (a, b) {
          let dateA: any = new Date(a.fechaVencimiento);
          let dateB: any = new Date(b.fechaVencimiento);
          return dateA - dateB;
        });

        if((productsFetched[0].stock - element.cantidad) < 0){
          let newStock = 0;
          let i = 0;

          do {
            newStock = productsFetched[i].stock - (i == 0 ? element.cantidad : newStock);
            productsFetched[i].stock = (newStock < 0) ? 0 : newStock;
            i += 1;
            newStock *= -1;
          } while(newStock > 0)

        }else{
          productsFetched[0].stock = productsFetched[0].stock - element.cantidad;
        }

        await this.inventoryRepository.save(productsFetched);
      }
    });

    response.status(200).json({
      message: 'Ok'
    });

  }

  async getStats(request: Request, response: Response, next: NextFunction){
    let detail = [];
    let salesOfTheDay = await this.documentRepository
      .createQueryBuilder('d')
      .leftJoinAndSelect('d.tipoDocumento', 'tD')
      .where(`d.fechaCreacion = "${Moment().format('DD/MM/YYYY')}"`)
      .orderBy('d.id', 'DESC')
      .getRawMany()
    ;

    for (let index = 0; index < salesOfTheDay.length; index++) {
      const element = salesOfTheDay[index];
      let obj = {
        correlativo: element.d_correlativo,
        totalVenta: element.d_totalNeto,
        documento: firstLetterCapitalize(element.tD_tipo),
      }

      detail.push(obj);
    }

    let totalSales = await this.documentRepository
      .createQueryBuilder('d')
      .select('SUM(totalNeto)', 'total')
      .where(`d.fechaCreacion = "${Moment().format('DD/MM/YYYY')}"`)
      .getRawOne();

    response.status(200).json({
      quantity: salesOfTheDay.length,
      total: totalSales.total ? totalSales.total : 0,
      detail: detail
    })

  }

  async getLastSales(request: Request, response: Response, next: NextFunction){
    const days = request.params.days;
    return await this.documentRepository
      .createQueryBuilder('d')
      .select(['d.fechaCreacion AS fecha', 'SUM(d.totalNeto) AS total' ])
      .where(`STR_TO_DATE(d.fechaCreacion, '%d/%m/%Y') >= STR_TO_DATE("${Moment().subtract(days, 'days').format('DD/MM/YYYY')}", '%d/%m/%Y')`)
      .orderBy("STR_TO_DATE(d.fechaCreacion, '%d/%m/%Y')", 'DESC')
      .groupBy('d.fechaCreacion')
      .getRawMany();

  }

  async getMonthlySales(request: Request, response: Response, next: NextFunction){
    let result = [];
    let months = [];
    let sales = [];
    const year = request.params.year;
    const salesByMonth = await this.documentRepository
      .createQueryBuilder('d')
      .select(['SUM(d.totalNeto) AS ventaTotal', `MONTH(STR_TO_DATE(d.fechaCreacion, '%d/%m/%Y')) AS mes` ])
      .where(`YEAR(STR_TO_DATE(d.fechaCreacion, '%d/%m/%Y')) = ${year}`)
      .groupBy(`MONTH(STR_TO_DATE(d.fechaCreacion, '%d/%m/%Y'))`)
      .getRawMany();

    salesByMonth.forEach(element => {
      months.push(firstLetterCapitalize(Moment(element.mes, 'M').locale('es').format('MMMM')));
      sales.push(parseInt(element.ventaTotal))
    });

    response.status(200).json({
      months,
      sales
    })
  }

  async bestSellingProduct(request: Request, response: Response, next: NextFunction){
    const year = request.params.year;
    const month = request.params.month;
    return await this.documentDetailRepository
      .createQueryBuilder('dD')
      .select(['dD.productoId, COUNT(dD.productoId) AS totalVentas', 'dP.descripcion AS producto'])
      .leftJoin('dD.producto', 'dP')
      .leftJoin('dD.documento', 'd')
      .where("MONTH(STR_TO_DATE(d.fechaCreacion, '%d/%m/%Y')) = '"+ month +"' AND YEAR(STR_TO_DATE(d.fechaCreacion, '%d/%m/%Y')) = '"+ year +"'")
      .groupBy("dD.productoId, dP.descripcion")
      .getRawMany();
  }

  async saleDetail(request: Request, response: Response, next: NextFunction){
    const id = request.params.id;
    return await this.sellRepository
      .createQueryBuilder("venta")
      .leftJoinAndSelect("venta.documento", "documento")
      .leftJoinAndSelect("venta.usuario", "usuario")
      .leftJoinAndSelect("documento.cliente", "cliente")
      .leftJoinAndSelect("documento.productos", "productos")
      .leftJoinAndSelect("productos.producto", "producto")
      .leftJoinAndSelect("documento.tipoDocumento", "tipo")
      .where("venta.id = :id", {id})
      .getOne();
  }

  async userPurchases(request: Request, response: Response, next: NextFunction){
    const id = request.params.id;
    return await this.documentRepository.find({
      where: {
        cliente: id
      },
      relations: ["productos", "productos.producto", "tipoDocumento"]
    })
  }

}
