import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserModuleRoutingModule } from './user-module-routing.module';
import { UserModuleComponent } from './user-module.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { AdminModule } from '../admin.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';



@NgModule({
  declarations: [UserModuleComponent, UserCreateComponent, UserEditComponent, UserFormComponent, UserListComponent],
  imports: [
    CommonModule,
    UserModuleRoutingModule,
    AdminModule,
    ReactiveFormsModule,
    DropdownModule,
    InputSwitchModule,
    TableModule
  ]
})
export class UserModuleModule { }
