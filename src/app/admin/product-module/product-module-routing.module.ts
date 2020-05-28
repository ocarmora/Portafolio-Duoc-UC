import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductModuleComponent } from './product-module.component';
import { ProductCategoryCreateComponent } from './components/product-category/product-category-create/product-category-create.component';
import { ProductCategoryEditComponent } from './components/product-category/product-category-edit/product-category-edit.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { ProductEditComponent } from './components/product/product-edit/product-edit.component';
import { ProductCategoryComponent } from './components/product-category/product-category.component';
import { ProductCategoryListComponent } from './components/product-category/product-category-list/product-category-list.component';

const routes: Routes = [
  {path: '', component: ProductModuleComponent, children: [
    {path: 'crear', component: ProductCreateComponent},
    {path: 'editar/:id', component: ProductEditComponent},
    {path: 'categorias', component: ProductCategoryComponent, children: [
      {path: '', component: ProductCategoryListComponent},
      {path: 'crear', component: ProductCategoryCreateComponent},
      {path: 'editar/:id', component: ProductCategoryEditComponent},
    ]}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductModuleRoutingModule { }
