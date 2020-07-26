import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SaleService } from '../../services/sale.service';
import { Toast } from 'src/app/shared/util';

@Component({
  selector: 'app-sale-detail',
  templateUrl: './sale-detail.component.html',
  styleUrls: ['./sale-detail.component.css']
})
export class SaleDetailComponent implements OnInit {

  sale: any = {};

  constructor(private _activatedRoute: ActivatedRoute, private _saleService: SaleService, private _router: Router) { }

  ngOnInit(): void {
    this.getSaleDetail();
  }

  getSaleDetail(){
    this._activatedRoute.params.subscribe(params => {
      const id: number = params['id'];
      if(!id){
        return this._router.navigate(['404']);
      }
      this._saleService.getSaleDetail(id).subscribe((result: any) => {
        this.sale = result;
      }, e => {
        Toast.fire({
          icon: 'error',
          titleText: 'Favor, recarga la página'
        })
        console.error(e);
      })
    })
  }

}
