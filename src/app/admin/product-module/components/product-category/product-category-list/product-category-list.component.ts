import { Component, OnInit } from '@angular/core';
import { ProductCategoryService } from '../../../services/product-category.service';
import { ProductCategory } from './../../../../../shared/interfaces/product-category';
import { SwalConfirm, Toast, firstLetterCapitalize } from './../../../../../shared/util';

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
    this._productCategoryService.getAll().subscribe((result: any) => {
      this.productCategories = [];
      let obj: any;
      result.forEach(element => {
        obj = {
          id: element.id,
          categoria: firstLetterCapitalize(element.categoria),
          productos: element.productos
        }
        this.productCategories.push(obj);
      });
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
