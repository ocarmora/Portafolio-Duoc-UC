import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {DetalleProducto} from "../entity/DetalleProducto";
import { pad } from "../Utilities";

export class InventoryController {

  private inventoryRepository = getRepository(DetalleProducto);

  async getAll(request: Request, response: Response, next: NextFunction){
    // return this.inventoryRepository.find({
    //   join: {
    //     alias: 'order',
    //     leftJoinAndSelect: {
    //       historial: 'order.historial',
    //       detalle: 'order.detalle',
    //       producto: 'detalle.producto'
    //     }
    //   },
    //   relations: [
    //     'proveedor'
    //   ],
    //   order: {
    //     id: 'DESC'
    //   }
    // });
  }

  async create(request: Request, response: Response, next: NextFunction){

    const orderId = request.body.id;
    const providerId = request.body.proveedorId;
    let productId: number; // ID producto

    let sku: any;
    let expirationDate: string = '00000000'; // fecha de vencimiento
    let productCategoryId: number; // ID categoria producto

    request.body.detalle.forEach((element: any) => {

      productId = element.producto.id;
      productCategoryId = element.producto.categoriaProducto.id

      // pad format
      let prodId = pad(productId, 3); // ID Producto 00X
      let prodCatId = pad(productCategoryId, 3); // ID Categoria Producto 00X
      let provId = pad(providerId, 3); // ID Proveedor 00X

      if(!element.producto.detalleFechaVencimiento){ // INGRESO UNICO
        sku = '' + provId + prodCatId + expirationDate + prodId; // OK
      }


    });


    return response.json(sku);

  }

}
