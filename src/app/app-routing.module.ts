import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { LoginComponent } from './components/shared/login/login.component';
import { Error404Component } from './components/shared/error404/error404.component';
import { Error403Component } from './components/shared/error403/error403.component';
import { BoHomeComponent } from './components/back-office/bo-home/bo-home.component';
import { HomeComponent } from './components/shared/home/home.component';


const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard], children: []},
  {path: 'login', component: LoginComponent, canActivate: [GuestGuard]},
  {path: '403', component: Error403Component},
  {path: '**', component: Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
