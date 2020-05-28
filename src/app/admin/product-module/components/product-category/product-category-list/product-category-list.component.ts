import { Component, OnInit } from '@angular/core';
import { ProductCategoryService } from '../../../services/product-category.service';
import { ProductCategory } from '../../../interfaces/product-category';
import { SwalConfirm, Toast } from './../../../../../shared/util';

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.css']
})
export class ProductCategoryListComponent implements OnInit {

  productCategories: ProductCategory[] = [];

  constructor(private _productCategoryService: ProductCategoryService) { }

  ngOnInit(): void {
    this.getProductCategories();
  }

  getProductCategories(){
    this._productCategoryService.getAll().subscribe((result: ProductCategory[]) => {
      this.productCategories = result;
    });
  }

  confirmDelete(id: number){
    SwalConfirm.fire({
      title: 'Confirmar acción',
      text: "Eliminarás definitivamente esta categoría"
    }).then(result => {
      if(result.value){
        this._productCategoryService.delete(id).subscribe(() => {
          this.getProductCategories();
          Toast.fire({
            icon: 'success',
            titleText: 'Categoría eliminada'
          })
        }, () => {
          Toast.fire({
            icon: 'error',
            title: 'Error',
            text: 'Inténtalo nuevamente'
          })
        });
      }
    })
  }

}
