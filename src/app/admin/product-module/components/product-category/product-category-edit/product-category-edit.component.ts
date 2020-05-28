import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategoryService } from '../../../services/product-category.service';
import { Toast } from 'src/app/shared/util';

@Component({
  selector: 'app-product-category-edit',
  templateUrl: './product-category-edit.component.html',
  styleUrls: ['./product-category-edit.component.css']
})
export class ProductCategoryEditComponent implements OnInit {

  categoryId: number;

  constructor(private _activatedRoute: ActivatedRoute, private _productCategoryService: ProductCategoryService, private _router: Router) { }

  ngOnInit(): void {
    this.getIdFromParam();
  }

  getIdFromParam(){
    this._activatedRoute.params.subscribe(params => {
      this.categoryId = params['id'];
    })
  }

  edit(form: any){
    this._productCategoryService.update(form).subscribe(() => {
      Toast.fire({
        icon: 'success',
        titleText: 'Categoría actualizada'
      });
      this._router.navigate(['/admin/productos/categorias']);
    }, () => {
      Toast.fire({
        icon: 'error',
        titleText: 'Inténtalo nuevamente'
      });
    })
  }

}
