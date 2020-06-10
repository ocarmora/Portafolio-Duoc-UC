import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CheckboxModule} from 'primeng/checkbox';
import {InputMaskModule} from 'primeng/inputmask';
import {InputSwitchModule} from 'primeng/inputswitch';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';

import { InventoryModuleRoutingModule } from './inventory-module-routing.module';
import { InventoryModuleComponent } from './inventory-module.component';
import { InventoryListComponent } from './components/inventory-list/inventory-list.component';
import { InventoryFormComponent } from './components/inventory-form/inventory-form.component';
import { InventoryCreateComponent } from './components/inventory-create/inventory-create.component';
import { AdminModule } from '../admin.module';


@NgModule({
  declarations: [
    InventoryModuleComponent,
    InventoryListComponent,
    InventoryFormComponent,
    InventoryCreateComponent
  ],
  imports: [
    CommonModule,
    InventoryModuleRoutingModule,
    AdminModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    CheckboxModule,
    InputMaskModule,
    InputSwitchModule,
    TableModule,
    TooltipModule
  ]
})
export class InventoryModuleModule { }
