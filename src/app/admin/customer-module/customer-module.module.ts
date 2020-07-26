import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerModuleRoutingModule } from './customer-module-routing.module';
import { CustomerModuleComponent } from './customer-module.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerCreateComponent } from './components/customer-create/customer-create.component';
import { CustomerEditComponent } from './components/customer-edit/customer-edit.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { AdminModule } from '../admin.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';


@NgModule({
  declarations: [CustomerModuleComponent, CustomerListComponent, CustomerCreateComponent, CustomerEditComponent, CustomerFormComponent, CustomerDetailComponent],
  imports: [
    CommonModule,
    CustomerModuleRoutingModule,
    AdminModule,
    ReactiveFormsModule,
    DropdownModule,
    InputSwitchModule,
    TableModule
  ]
})
export class CustomerModuleModule { }
