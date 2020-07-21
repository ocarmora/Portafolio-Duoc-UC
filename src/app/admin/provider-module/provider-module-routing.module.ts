import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProviderModuleComponent } from './provider-module.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { ProviderListComponent } from './components/provider-list/provider-list.component';
import { ProviderCreateComponent } from './components/provider-create/provider-create.component';
import { ProviderEditComponent } from './components/provider-edit/provider-edit.component';
import { ProviderDetailComponent } from './components/provider-detail/provider-detail.component';

const routes: Routes = [
  { path: '', component: ProviderModuleComponent, canActivate: [AuthGuard], children: [
    {path: '', component: ProviderListComponent},
    {path: 'nuevo', component: ProviderCreateComponent},
    {path: 'editar/:id', component: ProviderEditComponent},
    {path: 'detalle/:id', component: ProviderDetailComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderModuleRoutingModule { }
