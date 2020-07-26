import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { DocumentListComponent } from './components/documentos/document-list/document-list.component';
import { AdminModule } from '../admin/admin.module';


@NgModule({
  declarations: [CustomerComponent, DocumentListComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    AdminModule
  ]
})
export class CustomerModule { }
