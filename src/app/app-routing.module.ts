import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoHomePageComponent } from './pages/backOffice/bo-home-page/bo-home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { Error403PageComponent } from './pages/error403-page/error403-page.component';


const routes: Routes = [
  {path: 'login', component: LoginPageComponent, canActivate: [GuestGuard]},
  {path: '', component: BoHomePageComponent, canActivate: [AuthGuard], children: []},
  {path: '403', component: Error403PageComponent},
  {path: '**', component: Error404PageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
