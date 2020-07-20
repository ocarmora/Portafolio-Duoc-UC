import {getRepository, Any, createQueryBuilder} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {OrdenDeCompra} from "../entity/OrdenDeCompra";
import {HistorialOrdenDeCompra} from "../entity/HistorialOrdenDeCompra";
import {DetalleOrdenDeCompra} from "../entity/DetalleOrdenDeCompra";
import { Producto } from "../entity/Producto";
import * as Moment from "moment";

export class OrderController {

  private orderRepository = getRepository(OrdenDeCompra);
  private orderHistoryRepository = getRepository(HistorialOrdenDeCompra);
  private orderDetailRepository = getRepository(DetalleOrdenDeCompra);

  async one(request: Request, response: Response, next: NextFunction){
    await this.orderRepository
      .createQueryBuilder('orders')
      .where('orders.id = :id', {id: request.params.id})
      .leftJoinAndSelect('orders.detalle', 'detalle')
      .leftJoinAndSelect('orders.historial', 'historial')
      .leftJoinAndSelect('orders.proveedor', 'proveedor')
      .leftJoinAndSelect('detalle.producto', 'producto')
      .leftJoinAndSelect('producto.categoriaProducto', 'categoria')
      .leftJoinAndSelect('historial.usuario', 'usuario')
      .getOne()
      .then(result => {
        if(!result){
          return response.status(404).end();
        }
        return response.status(200).json(result);
      }).catch(error => {
        return response.status(500).json(error);
      });
  }

  async getAll(request: Request, response: Response, next: NextFunction){
    return this.orderRepository.find({
      join: {
        alias: 'order',
        leftJoinAndSelect: {
          historial: 'order.historial',
          detalle: 'order.detalle',
          producto: 'detalle.producto'
        }
      },
      relations: [
        'proveedor'
      ],
      order: {
        id: 'DESC'
      }
    });
  }

  async openOrders(request: Request, response: Response, next: NextFunction){
    return this.orderRepository.find({
      where: {
        activo: 1 // open order
      },
      join: {
        alias: 'order',
        leftJoinAndSelect: {
          historial: 'order.historial',
          detalle: 'order.detalle',
          producto: 'detalle.producto',
          categoria: 'producto.categoriaProducto'
        }
      },
      relations: [
        'proveedor'
      ],
      order: {
        id: 'DESC'
      }
    });
  }

  async pendingOrders(request: Request, response: Response, next: NextFunction){
    return this.orderRepository.find({where: {activo: 1}})
  }

  async save(request: Request, response: Response, next: NextFunction){

    let order = new OrdenDeCompra();
    order.proveedor = request.body.proveedor;
    order.metodoDePago = request.body.metodoDePago.metodo;
    order.comentario = request.body.comentario;
    order.pagoFacturaDias = request.body.pagoFacturaDias;

    this.orderRepository.save(order).then(async () => {

      request.body.productos.forEach(product => {
        let orderDetail = new DetalleOrdenDeCompra();
        orderDetail.cantidad = product.cantidad;
        orderDetail.producto = product.producto;
        orderDetail.precioCompra = product.precioUnidad;
        orderDetail.ordenDeCompra = order;
        this.orderDetailRepository.save(orderDetail);
      });

      // Order History
      let orderHistory = new HistorialOrdenDeCompra();

      orderHistory.detalle = 'Orden de compra generada';
      orderHistory.fecha = Moment().format('DD/MM/YYYY');
      orderHistory.ordenDeCompra = order;
      orderHistory.usuario = request.body.usuario;

      await this.orderHistoryRepository.save(orderHistory);

      return response.status(200).end();

    }).catch(error=> {
      return response.status(500).json(error.message);
    })

  }

  async remove(request: Request, response: Response, next: NextFunction){
    this.orderRepository.findOne({where: {id: request.body.orderId}}).then(async result => {
      const orderToDelete = result;
      orderToDelete.activo = 0;
      await this.orderRepository.save(orderToDelete);

      // Update detail order
      let orderHistory = {
        detalle: 'Orden de compra anulada',
        fecha: Moment().format('DD/MM/YYYY'),
        ordenDeCompra: orderToDelete,
        usuario: request.body.user
      }

      await this.orderHistoryRepository.save(orderHistory);

      return response.status(200).end();
    }).catch(error => {
      return response.status(500).json(error);
    });
  }

}
