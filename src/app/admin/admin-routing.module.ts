import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../shared/guards/auth.guard';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {path: '', component: AdminComponent, canActivate: [AuthGuard]},
  { path: 'productos', loadChildren: () => import('./product-module/product-module.module').then(m => m.ProductModuleModule), canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
