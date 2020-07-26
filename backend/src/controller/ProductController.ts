import {getRepository, Like} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Producto} from "../entity/Producto";
import { DetalleProducto } from "../entity/DetalleProducto";

export class ProductController {

  private repository = getRepository(Producto);
  private productDetailRepository = getRepository(DetalleProducto);

  async all(request: Request, response: Response, next: NextFunction){
    return this.repository.find({where: {activo: 1}, relations: ['categoriaProducto', 'proveedor'], order: {id: 'DESC'}});
  }

  async productsByProvider(request: Request, response: Response, next: NextFunction){
    this.repository.find({where: {proveedor: request.params.id, activo: 1}, relations: ['categoriaProducto']}).then(products => {
      return response.status(200).json(products);
    }).catch(() => {
      return response.status(500).end();
    })
  }

  async save(request: Request, response: Response, next: NextFunction){
    this.repository.findOne({where: {codigoDeBarra: request.body.codigoDeBarra, activo: 1}}).then(product => {
      if(product){
        return response.status(409).end();
      }
      this.repository.save(request.body).then(() => {
        return response.status(200).end();
      });
    }).catch(() => {
      return response.status(500).end();
    });
  }

  async update(request: Request, response: Response, next: NextFunction){
    this.repository.findOne(request.params.id, {where: {activo: 1}}).then(product => {
      this.repository.save(request.body).then(() => {
        return response.status(200).end();
      });
    }).catch(() => {
      return response.status(500).end();
    });
  }

  async delete(request: Request, response: Response, next: NextFunction){
    this.repository.findOneOrFail(request.params.id, {where: {activo: 1}}).then(async (product) => {
      product.activo = 0;
      await this.repository.save(product);
      return response.status(200).end();
    }).catch(() => {
      return response.status(500).end();
    });
  }

  async one(request: Request, response: Response, next: NextFunction){
    this.repository.findOne(request.param('id'), {where: {activo: 1}, relations: ['proveedor', 'categoriaProducto']}).then(result => {
      if(!result){
        return response.status(404).end();
      }
      return response.status(200).json(result);
    }).catch(() => {
      return response.status(500).end();
    });
  }

  async oneByBarcode(request: Request, response: Response, next: NextFunction){
    let result: any = [];
    const barcode = request.params.barcode;
    const fetched: any = await this.repository
      .createQueryBuilder('products')
      .addSelect('SUM(detalle.stock)', 'stockTotal')
      .leftJoin('detalle_producto', 'detalle', 'detalle.productoId = products.id')
      .where('products.codigoDeBarra = ' + barcode + ' AND products.activo = 1')
      .groupBy('products.id')
      .getRawOne();

    let obj: any = {
      id: fetched.products_id,
      codigoDeBarra: fetched.products_codigoDeBarra,
      descripcion: fetched.products_descripcion,
      precioNeto: fetched.products_precioNeto,
      stockCritico: fetched.products_stockCritico,
      tieneVencimiento: fetched.products_tieneVencimiento ? true  : false,
      stock: fetched.stockTotal ? parseInt(fetched.stockTotal) : 0,
    }

    response.status(200).send(obj);
  }

}
