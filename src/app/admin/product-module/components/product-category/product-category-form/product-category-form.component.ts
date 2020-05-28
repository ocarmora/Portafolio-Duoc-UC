import { Component, OnInit, Output, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { toLowerCase } from 'src/app/shared/util';
import { ProductCategoryService } from '../../../services/product-category.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-category-form',
  templateUrl: './product-category-form.component.html',
  styleUrls: ['./product-category-form.component.css']
})
export class ProductCategoryFormComponent implements OnInit {

  form = new FormGroup({
    id: new FormControl(null),
    categoria: new FormControl('', Validators.required)
  });

  @Input()
  formType: string;

  @Input()
  categoryId: number;

  @Output()
  formValues = new EventEmitter();

  constructor(private _productCategoryService: ProductCategoryService) { }

  ngOnInit(): void {
    this.formInit(this.formType);
  }

  formInit(formType: String){
    if(formType == 'edit'){
      this._productCategoryService.getOne(this.categoryId).toPromise().then((result: any) => {
        this.form.setValue({
          id: result.id,
          categoria: result.categoria
        })
      });
    }
  }

  sendData(formData: Object): void{
    this.formValues.emit(toLowerCase(formData));
  }

}
