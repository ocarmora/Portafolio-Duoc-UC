import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProviderModuleRoutingModule } from './provider-module-routing.module';
import { ProviderModuleComponent } from './provider-module.component';
import { ProviderCreateComponent } from './components/provider-create/provider-create.component';
import { ProviderEditComponent } from './components/provider-edit/provider-edit.component';
import { ProviderListComponent } from './components/provider-list/provider-list.component';
import { ProviderFormComponent } from './components/provider-form/provider-form.component';
import { AdminModule } from '../admin.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';
import { ProviderDetailComponent } from './components/provider-detail/provider-detail.component';


@NgModule({
  declarations: [ProviderModuleComponent, ProviderCreateComponent, ProviderEditComponent, ProviderListComponent, ProviderFormComponent, ProviderDetailComponent],
  imports: [
    CommonModule,
    ProviderModuleRoutingModule,
    AdminModule,
    ReactiveFormsModule,
    DropdownModule,
    InputSwitchModule,
    TableModule,
    FormsModule
  ]
})
export class ProviderModuleModule { }
