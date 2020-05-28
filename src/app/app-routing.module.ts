import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { GuestGuard } from './shared/guards/guest.guard';
import { LoginComponent } from './shared/components/login/login.component';
import { Error404Component } from './shared/components/error404/error404.component';
import { Error403Component } from './shared/components/error403/error403.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [GuestGuard]},
  {path: '403', component: Error403Component, canActivate: [AuthGuard],},
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  {path: 'clientes', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) },
  { path: 'proveedores', loadChildren: () => import('./provider/provider.module').then(m => m.ProviderModule) },
  {path: '**', component: Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
