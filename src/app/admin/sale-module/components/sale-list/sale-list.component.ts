import { Component, OnInit } from '@angular/core';
import { SaleService } from '../../services/sale.service';
import { Toast } from 'src/app/shared/util';
import { pad } from 'backend/src/Utilities';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.css']
})
export class SaleListComponent implements OnInit {
  es: any;
  filterDate: Date;

  maxDateValue = new Date();

  sales: any = [];

  constructor(private _salesService: SaleService) { }

  ngOnInit(): void {
    this.es = {
        firstDayOfWeek: 1,
        dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        dayNamesShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
        dayNamesMin: ["Do","Lu","Ma","Mi","Ju","Vi","Sa"],
        monthNames: [ "Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octube","Noviembre","Diciembre" ],
        monthNamesShort: [ "Ene", "Feb", "Mar", "Abr", "May", "Jun","Jul", "Ago", "Sep", "Oct", "Nov", "Dic" ],
        today: 'Hoy',
        clear: 'Limpiar',
        dateFormat: 'dd/mm/yy',
        weekHeader: 'S'
    };
    this.getSales();
  }

  getSales(){
    this._salesService.getSales().subscribe(result => {
      this.sales = result;
    }, (error) => {
      Toast.fire({
        icon: 'error',
        titleText: 'Favor recarga la página'
      });
      console.error(error);
    });
  }

  dateFormated(date: any): string{
    if(date == ''){
      return '';
    }
    let newDate = date.getDate() + "/" + ((date.getMonth().toString().length == 1) ? '0' + (date.getMonth() + 1) : (date.getMonth()) + 1) + "/" + date.getFullYear();
    return newDate
  }

}
