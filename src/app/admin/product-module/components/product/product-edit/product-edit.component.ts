import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Toast } from 'src/app/shared/util';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  productId: number;

  constructor(private _activatedRoute: ActivatedRoute, private _productService: ProductService, private _router: Router) { }

  ngOnInit(): void {
    this.getIdFromParam();
  }


  getIdFromParam(){
    this._activatedRoute.params.subscribe(params => {
      this.productId = params['id'];
    })
  }

  update(data:any){
    this._productService.update(data).subscribe(() => {
      Toast.fire({
        icon: 'success',
        titleText: 'Producto actualizado'
      });
      return this._router.navigate(['/admin/productos']);
    }, () => {
      Toast.fire({
        icon: 'error',
        titleText: 'Inténtalo nuevamente'
      })
    });
  }

}
