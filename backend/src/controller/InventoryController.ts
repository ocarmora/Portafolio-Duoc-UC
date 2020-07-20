import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {DetalleProducto} from "../entity/DetalleProducto";
import { pad } from "../Utilities";
import { OrdenDeCompra } from "../entity/OrdenDeCompra";
import { Producto } from "../entity/Producto";
import { HistorialOrdenDeCompra } from "../entity/HistorialOrdenDeCompra";
import * as Moment from "moment";
import { DetalleOrdenDeCompra } from "../entity/DetalleOrdenDeCompra";


export class InventoryController {

  private detailProductRepository = getRepository(DetalleProducto);
  private orderRepository = getRepository(OrdenDeCompra);
  private orderHistoryRepository = getRepository(HistorialOrdenDeCompra);
  private productRepository = getRepository(Producto);

  async getAll(request: Request, response: Response, next: NextFunction){

    let result: Array<any> = [];

    const resultFetched = await getRepository(Producto)
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

      result.push(obj);
    });

    response.status(200).send(result);
  }

  async getDetail(request: Request, response: Response, next: NextFunction){
    const productId = request.params.id;
    let result = [];

    const productDetail = await this.detailProductRepository
      .createQueryBuilder('d')
      .leftJoinAndSelect(Producto, 'p', 'p.id = d.productoId')
      .where('d.producto = :productId', {productId: productId})
      .getRawMany();

    productDetail.forEach(element => {
      let obj = {
        descripcion: element.p_descripcion,
        sku: element.d_sku,
        stock: element.d_stock,
        fechaVencimiento: element.d_fechaVencimiento,
        ordenDeCompra: element.dOC_ordenDeCompraId
      }

      result.push(obj);
    });

    response.status(200).json(result);
  }

  async create(request: Request, response: Response, next: NextFunction){

    const providerId = request.body.proveedorId;
    const orderId = request.body.id;
    const user = request.body.usuario

    let expirationDate: string;
    let sku: any;
    expirationDate = '00000000';

    await request.body.detalle.forEach(async (element: any) => {

      let hasExpiration = element.producto.tieneVencimiento;

      let product = element.producto;
      let category = element.producto.categoriaProducto;

      let quantity = element.cantidad;

      // pad format
      let prodId = pad(product.id, 3);
      let prodCatId = pad(category.id, 3);
      let provId = pad(providerId, 3);

      sku = '' + provId + prodCatId + (expirationDate.replace(/\//g, '')) + prodId;

      let obj: any = {
        stock: quantity,
        fechaVencimiento: null,
        producto: product,
        sku: sku
      }

      if(hasExpiration){ // has expiration date

        element.detalleFechasVencimiento.forEach(async (detailExpiration: any)=> {

          let objWithExpiration: any = {
            stock: detailExpiration.quantity,
            fechaVencimiento: detailExpiration.date,
            producto: product,
            sku: '' + provId + prodCatId + (detailExpiration.date.replace(/\//g, '')) + prodId
          }

          let detailExist = await this.detailProductRepository.findOne({ where: {sku: objWithExpiration.sku}});

          if(!detailExist){
            await this.detailProductRepository.save(objWithExpiration);
          }else{
            detailExist.stock += detailExpiration.quantity;
            await this.detailProductRepository.save(detailExist);
          }
        });

      }else{ // hasn't expiration date

        let detailExist = await this.detailProductRepository.findOne({where: {sku: sku}});

        if(!detailExist){
          await this.detailProductRepository.save(obj);
        }else{
          detailExist.stock += quantity;
          await this.detailProductRepository.save(detailExist);
        }
      }
    });

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

  }

  async getCriticalStock(request: Request, response: Response, next: NextFunction){
    try {
      let detail = await this.productRepository
      .createQueryBuilder('p')
      .select(['p.descripcion as `descripcion`', 'p.stockCritico as `stockCritico`'])
      .addSelect('SUM(dp.stock)', 'stock')
      .leftJoin('p.detalleProducto', 'dp')
      .groupBy('p.id')
      .having('stock < p.stockCritico')
      .getRawMany();

      let obj = {
        total: detail.length,
        detail: detail
      }

      return obj;
    } catch (error) {
      return error;
    }
  }

}
