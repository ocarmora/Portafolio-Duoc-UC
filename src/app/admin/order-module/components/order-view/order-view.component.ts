import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order } from 'src/app/shared/interfaces/order';
import { SwalConfirm, Toast } from 'src/app/shared/util';
import { BusinessService } from 'src/app/shared/services/business.service';
import * as html2pdf from 'html2pdf.js';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit {

  order: Order;
  orderSubTotal: number = 0;
  orderTax: number;
  orderTotal: number;
  businessInfo: any;
  currentUser: any;

  buttons: boolean = true;

  constructor(private _activatedRoute: ActivatedRoute, private _orderService: OrderService, private _businessService: BusinessService, private _authService: AuthService) { }

  ngOnInit(): void {
    this.getOrderDetail();
    this.getBusinessInfo();
    this.getCurrentUser();
    this.initViewwer();

  }

  initViewwer(){
    this._activatedRoute.data.subscribe(data => {
      if(data['viewer']){
        this.buttons = false;
      }
    })
  }

  getOrderDetail(){
    this._activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this._orderService.getOrderDetail(id).subscribe((result: any) => {
        this.order = result;

        result.detalle.forEach(element => {
          this.orderSubTotal += (element.cantidad * element.precioCompra);
        });

        this.orderTax = this.orderSubTotal * 0.19;
        this.orderTotal = this.orderSubTotal + this.orderTax;

      })
    });
  }

  getBusinessInfo(){
    this._businessService.getInfo().subscribe(result => {
      this.businessInfo = result;
    })
  }

  getCurrentUser(){
    const token = this._authService.getToken();
    this._authService.getCurrentUser(token).subscribe((result: Object) => {
      this.currentUser = result;
    });
  }

  cancelOrder(id: number){
    SwalConfirm.fire({
      title: 'Confirmar Anulación',
      text: 'Anularás definitivamente esta orden de compra',
      confirmButtonText: 'Anular OC'
    }).then(result => {
      if(result.value){
        let data = {
          orderId: id,
          user: this.currentUser
        }
        this._orderService.cancel(data).subscribe(result => {
          Toast.fire({
            icon: 'info',
            titleText: 'Ordem de compra anulada'
          });
          this.getOrderDetail();
        });
      }
    })
  }

  onExportPDFClick(){
    const options = {
      margin: 0,
      filename: 'OC-'+ this.order.id + '_' + this.order.historial[0].fecha +'.pdf',
      image: {
        type: 'jpeg'
      },
      html2canvas: {
        scale: 4
      },
      jsPDF: {
        unit: 'cm',
        format: 'letter',
        orientation: 'portrait',
      }
    }

    const content: Element = document.getElementById('orderToPdf');

    html2pdf()
    .from(content)
    .set(options)
    .save()
    .then(() => {
      Toast.fire({
        icon: 'success',
        titleText: 'Documento generado'
      })
    }).catch(() => {
      Toast.fire({
        icon: 'error',
        titleText: 'Inténtalo nuevamente'
      })
    });
  }

}
