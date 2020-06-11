import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {DetalleProducto} from "../entity/DetalleProducto";
import { pad } from "../Utilities";
import { OrdenDeCompra } from "../entity/OrdenDeCompra";
import { Producto } from "../entity/Producto";
import { HistorialOrdenDeCompra } from "../entity/HistorialOrdenDeCompra";
import * as Moment from "moment";


export class InventoryController {

  private detailProductRepository = getRepository(DetalleProducto);
  private orderRepository = getRepository(OrdenDeCompra);
  private orderHistoryRepository = getRepository(HistorialOrdenDeCompra);

  async getAll(request: Request, response: Response, next: NextFunction){

    let result: Array<any> = [];

    const resultFetched =
      await getRepository(Producto)
        .createQueryBuilder('p')
        .select('p.*')
        .addSelect('SUM(d.stock)', 'stockTotal')
        .leftJoin('detalle_producto', 'd', 'p.id = d.productoId')
        .leftJoinAndSelect('categoria_producto', 'cp', 'p.categoriaProductoId = cp.id')
        .leftJoinAndSelect('usuario', 'pr', 'p.proveedorId = pr.id')
        .where('p.activo = 1')
        .groupBy('p.id')
        .getRawMany();

    resultFetched.forEach(element => {

      let obj: any = {};

      obj.id = element.id;
      obj.descripcion = element.descripcion;
      obj.precioNeto = element.precioNeto;
      obj.codigoDeBarra = element.codigoDeBarra;
      obj.stockCritico = element.stockCritico;
      obj.stockTotal = parseInt(element.stockTotal);

      obj.categoria = {
        id: element.cp_id,
        nombre: element.cp_categoria,
      }

      // obj.proveedor = {
      //   id: element.pr_id,
      //   nombre: JSON.parse(element.pr_detalle).nombre,
      // }

       result.push(obj);

    });

    response.status(200).send(result);
    //response.status(200).send(resultFetched);

  }

  async create(request: Request, response: Response, next: NextFunction){

    const providerId = request.body.proveedorId;
    const orderId = request.body.id;
    const user = request.body.usuario

    let expirationDate: string;
    let sku: any;
    let detailsToSave: Array<any> = [];
    expirationDate = '00000000';

    request.body.detalle.forEach(async (element: any) => {

      let product = element.producto;
      let category = element.producto.categoriaProducto;

      let quantity = element.cantidad;
      let purshacePrice = element.precioCompra;

      // pad format
      let prodId = pad(product.id, 3);
      let prodCatId = pad(category.id, 3);
      let provId = pad(providerId, 3);

      sku = '' + provId + prodCatId + (expirationDate.replace(/\//g, '')) + prodId;

      let obj: any = {
        stock: quantity,
        fechaVencimiento: null,
        producto: product,
        precioCompra: purshacePrice,
        sku: sku
      }

      if(element.detalleFechasVencimiento){
        element.detalleFechasVencimiento.forEach(async (detailExpiration: any)=> {
          let objWithExpiration: any = {
            stock: detailExpiration.quantity,
            fechaVencimiento: detailExpiration.date,
            producto: product,
            precioCompra: purshacePrice,
            sku: '' + provId + prodCatId + (detailExpiration.date.replace(/\//g, '')) + prodId
          }
          detailsToSave.push(objWithExpiration);
        });
      }else{
        detailsToSave.push(obj);
      }

    });

    this.detailProductRepository.save(detailsToSave)
    .then(async () => {

      // Update order
      let order = await this.orderRepository.findOne(orderId);
      order.activo = 2;
      await this.orderRepository.save(order);

      // Update detail order
      let orderHistory = {
        detalle: 'Orden de compra ingresada a inventario',
        fecha: Moment().format('DD/MM/YYYY'),
        ordenDeCompra: order,
        usuario: user
      }

      await this.orderHistoryRepository.save(orderHistory);

      response.status(200).end();

    }).catch(error => {
      response.status(500).json(error);
    });

  }

}
