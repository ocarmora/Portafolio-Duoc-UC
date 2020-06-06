import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {MultiSelectModule} from 'primeng/multiselect';


import { OrderModuleRoutingModule } from './order-module-routing.module';
import { OrderModuleComponent } from './order-module.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderCreateComponent } from './components/order-create/order-create.component';
import { ProductModuleModule } from '../product-module/product-module.module';
import { AdminModule } from '../admin.module';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrderViewComponent } from './components/order-view/order-view.component';


@NgModule({
  declarations: [
    OrderModuleComponent,
    OrderListComponent,
    OrderCreateComponent,
    OrderFormComponent,
    OrderViewComponent
  ],
  imports: [
    CommonModule,
    OrderModuleRoutingModule,
    ProductModuleModule,
    AdminModule,
    TableModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectModule
  ]
})
export class OrderModuleModule { }
