import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductModuleComponent } from './product-module.component';
import { ProductCategoryCreateComponent } from './components/product-category/product-category-create/product-category-create.component';
import { ProductCategoryEditComponent } from './components/product-category/product-category-edit/product-category-edit.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { ProductEditComponent } from './components/product/product-edit/product-edit.component';
import { ProductCategoryComponent } from './components/product-category/product-category.component';
import { ProductCategoryListComponent } from './components/product-category/product-category-list/product-category-list.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { RoleGuard } from 'src/app/shared/guards/role.guard';
import { UserType } from 'backend/src/Utilities';

const routes: Routes = [
  {path: '', component: ProductModuleComponent, children: [
    {path: '', component: ProductListComponent, canActivate: [RoleGuard], data: {roles: [UserType.Admin, UserType.Vendedor, UserType.Empleado]}},
    {path: 'crear', component: ProductCreateComponent, canActivate: [RoleGuard], data: {roles: [UserType.Admin, UserType.Empleado]}},
    {path: 'editar/:id', component: ProductEditComponent, canActivate: [RoleGuard], data: {roles: [UserType.Admin, UserType.Empleado]}},
    {path: 'categorias', component: ProductCategoryComponent, children: [
      {path: '', component: ProductCategoryListComponent, canActivate: [RoleGuard], data: {roles: [UserType.Admin, UserType.Empleado]}},
      {path: 'crear', component: ProductCategoryCreateComponent, canActivate: [RoleGuard], data: {roles: [UserType.Admin, UserType.Empleado]}},
      {path: 'editar/:id', component: ProductCategoryEditComponent, canActivate: [RoleGuard], data: {roles: [UserType.Admin, UserType.Empleado]}},
    ]}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductModuleRoutingModule { }
