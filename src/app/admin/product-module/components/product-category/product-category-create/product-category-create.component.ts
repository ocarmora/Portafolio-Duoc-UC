import { Component, OnInit } from '@angular/core';
import { ProductCategoryService } from '../../../services/product-category.service';
import { Toast } from 'src/app/shared/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-category-create',
  templateUrl: './product-category-create.component.html',
  styleUrls: ['./product-category-create.component.css']
})
export class ProductCategoryCreateComponent implements OnInit {

  constructor(private _productCategoryService: ProductCategoryService, private _router: Router) { }

  ngOnInit(): void {
  }

  create(form: any){
    this._productCategoryService.create(form).subscribe(() => {
      Toast.fire({
        icon: 'success',
        titleText: 'Categoría creada'
      });
      this._router.navigate(['/admin/productos/categorias']);
    }, (error) => {
      if(error.status == 409){
        return Toast.fire({
          icon:'warning',
          titleText: 'La categoría ya existe',
        });
      }
      Toast.fire({
        icon:'error',
        titleText: 'Inténtalo nuevamente',
      });
    });
  }

}
