import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeEn from '@angular/common/locales/en';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'app/app-routing.module';
import { AppComponent } from 'app/app.component';
import { BaseModule } from 'app/base/base.module';
import { SharedModule } from 'app/shared/shared.module';

import { DataViewModule } from 'primeng/dataview';
//import { DataViewModule } from 'primeng/dataview';
import { TableModule } from 'primeng/table';
import { ProductsComponent } from './products/products.component';
import { ProductsAdminComponent } from './products-admin/products-admin.component';

@NgModule({
  declarations: [AppComponent, ProductsComponent, ProductsAdminComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    BaseModule,
    DataViewModule,
    TableModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(localeEn, 'en');
  }
}
