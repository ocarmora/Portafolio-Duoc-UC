import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';


@NgModule({
  declarations: [
    NavbarComponent,
    AdminComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
  ],
  exports: [
    NavbarComponent
  ]
})
export class AdminModule { }
