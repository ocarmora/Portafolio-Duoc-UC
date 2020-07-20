import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import localeCL from '@angular/common/locales/es-CL'

import { NgxBarcodeModule } from 'ngx-barcode';
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
    NgxBarcodeModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: LOCALE_ID, useValue: 'es-CL'},
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'CLP'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
