import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ProductCategoryService } from '../../../services/product-category.service';
import {SelectItem} from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { firstLetterCapitalize } from 'src/app/shared/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  @Output()
  formValues = new EventEmitter();

  @Input()
  productId: number;

  @Input()
  formType: string;

  productCategories: SelectItem[] = [];
  providerUsers: SelectItem[] = [];

  form = new FormGroup({
    id: new FormControl(null),
    codigoDeBarra: new FormControl('', Validators.required),
    precioNeto: new FormControl('', Validators.required),
    stockCritico: new FormControl('', Validators.required),
    tieneVencimiento: new FormControl(false, Validators.required),
    proveedor: new FormControl('', Validators.required),
    categoriaProducto: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required)
  });

  constructor(private _productCategoryService: ProductCategoryService, private _productService: ProductService, private _router: Router) { }

  ngOnInit(): void {
    this.getProviderUsers();
    this.getProductCategories();
    this.formInit(this.formType);
  }

  formInit(formType: String){
    if(formType == 'edit'){
      this._productService.getOne(this.productId).subscribe(result => {
        return this.form.setValue({
          id: result.id,
          codigoDeBarra: result.codigoDeBarra,
          precioNeto: result.precioNeto,
          stockCritico: result.stockCritico,
          proveedor: result.proveedor,
          tieneVencimiento: result.tieneVencimiento,
          categoriaProducto: result.categoriaProducto,
          descripcion: result.descripcion,
        });
      }, () => {
        return this._router.navigate(['404']);
      });
    }
    return;
  }

  getProductCategories(){
    this._productCategoryService.getAll().subscribe(result => {
      result.forEach(element => {
        let obj = {
          label: firstLetterCapitalize(element.categoria),
          value: element
        };
        this.productCategories.push(obj);
      });
    });
  }

  getProviderUsers(){
    this._productService.getProviders().subscribe(result => {
        result.forEach(element => {
          let obj = {
            label: element.detalle.nombre,
            value: element
          };
          this.providerUsers.push(obj);
        });
    });
  }

  sendData(): void{
    if(!this.form.valid){
      return;
    }
    this.formValues.emit(this.form.value);
  }

}
