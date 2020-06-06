import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import localeCL from '@angular/common/locales/es-CL'

import { AppComponent } from './app.component';
import { LoginComponent } from './shared/components/login/login.component';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { Error404Component } from './shared/components/error404/error404.component';
import { Error403Component } from './shared/components/error403/error403.component';
import { registerLocaleData } from '@angular/common';


registerLocaleData(localeCL, 'es-CL');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    Error404Component,
    Error403Component,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: LOCALE_ID, useValue: 'es-CL'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
