import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerModuleRoutingModule } from './customer-module-routing.module';
import { CustomerModuleComponent } from './customer-module.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerCreateComponent } from './components/customer-create/customer-create.component';
import { CustomerEditComponent } from './components/customer-edit/customer-edit.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';


@NgModule({
  declarations: [CustomerModuleComponent, CustomerListComponent, CustomerCreateComponent, CustomerEditComponent, CustomerFormComponent],
  imports: [
    CommonModule,
    CustomerModuleRoutingModule
  ]
})
export class CustomerModuleModule { }
