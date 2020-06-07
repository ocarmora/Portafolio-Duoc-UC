import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryModuleRoutingModule } from './inventory-module-routing.module';
import { InventoryModuleComponent } from './inventory-module.component';


@NgModule({
  declarations: [InventoryModuleComponent],
  imports: [
    CommonModule,
    InventoryModuleRoutingModule
  ]
})
export class InventoryModuleModule { }
