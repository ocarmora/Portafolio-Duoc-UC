import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';



import { ProductModuleRoutingModule } from './product-module-routing.module';
import { ProductModuleComponent } from './product-module.component';

import {NavbarComponent} from './../shared/components/navbar/navbar.component';
import { ProductCategoryComponent } from './components/product-category/product-category.component';
import { ProductCategoryFormComponent } from './components/product-category/product-category-form/product-category-form.component';
import { ProductCategoryCreateComponent } from './components/product-category/product-category-create/product-category-create.component';
import { ProductCategoryEditComponent } from './components/product-category/product-category-edit/product-category-edit.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { ProductEditComponent } from './components/product/product-edit/product-edit.component';
import { ProductFormComponent } from './components/product/product-form/product-form.component';
import { ProductCategoryListComponent } from './components/product-category/product-category-list/product-category-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from './components/product/product-list/product-list.component';


@NgModule({
  declarations: [
    ProductModuleComponent,
    NavbarComponent,
    ProductCategoryComponent,
    ProductCategoryFormComponent,
    ProductCategoryCreateComponent,
    ProductCategoryEditComponent,
    ProductCreateComponent,
    ProductEditComponent,
    ProductFormComponent,
    ProductCategoryListComponent,
    ProductListComponent,
  ],
  imports: [
    CommonModule,
    ProductModuleRoutingModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule
  ]
})
export class ProductModuleModule { }
