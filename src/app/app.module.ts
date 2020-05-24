import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { InputTextModule}  from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { BoHomePageComponent } from './pages/backOffice/bo-home-page/bo-home-page.component';
import { LoginComponent } from './components/shared/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { Error403PageComponent } from './pages/error403-page/error403-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    BoHomePageComponent,
    LoginComponent,
    Error404PageComponent,
    Error403PageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    InputTextModule,
    PanelModule,
    ToastModule,
    MessageModule,
    MessagesModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
