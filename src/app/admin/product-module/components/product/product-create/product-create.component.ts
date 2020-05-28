import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Toast } from 'src/app/shared/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  constructor(private _productService: ProductService, private _router: Router) { }

  ngOnInit(): void {
  }

  create(formData: any){
    this._productService.create(formData).subscribe(() => {
      Toast.fire({
        icon: 'success',
        titleText: 'Producto habilitado'
      });
      this._router.navigate(['/admin/productos']);
    }, (error) => {
      if(error.status == 409){
        return Toast.fire({
          icon:'warning',
          titleText: 'El producto ya existe',
        });
      }
      Toast.fire({
        icon:'error',
        titleText: 'Inténtalo nuevamente',
      });
    });
  }

}
