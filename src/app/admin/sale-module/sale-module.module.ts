import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminModule } from './../admin.module';

import { SaleModuleRoutingModule } from './sale-module-routing.module';
import { SaleModuleComponent } from './sale-module.component';
import { SaleListComponent } from './components/sale-list/sale-list.component';
import { SaleFormComponent } from './components/sale-form/sale-form.component';
import { SaleCreateComponent } from './components/sale-create/sale-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';



@NgModule({
  declarations: [SaleModuleComponent, SaleListComponent, SaleFormComponent, SaleCreateComponent],
  imports: [
    CommonModule,
    SaleModuleRoutingModule,
    AdminModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    InputMaskModule,
    AutoCompleteModule,
    TableModule
  ]
})
export class SaleModuleModule { }
