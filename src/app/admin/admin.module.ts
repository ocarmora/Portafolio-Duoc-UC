import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { NgxBarcodeModule } from 'ngx-barcode';
import {ChartModule} from 'primeng/chart';

@NgModule({
  declarations: [
    NavbarComponent,
    AdminComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxBarcodeModule,
    ChartModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class AdminModule { }
