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

/**
 * Componants that I have imported
 * DataViewModule and TableModule are used to create the products page and the admin-products page
 * thanks to the library PrimeNG
 * ProductsComponent and ProductsAdminComponent are the componants I have created to display the
 * data of the products page and the admin-products page
 * FormsModule and RadioButtonModule are usefull for the form to create a new product on the admin-products page
 * ConfirmationService and MessageService are used to confirm I want to delete a product on the admin-products page
 */
import { DataViewModule } from 'primeng/dataview';
import { TableModule } from 'primeng/table';
import { ProductsComponent } from './products/products.component';
import { ProductsAdminComponent } from './products-admin/products-admin.component';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ConfirmationService, MessageService } from 'primeng/api';

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
    TableModule,
    FormsModule,
    RadioButtonModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en' },
    ConfirmationService, 
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(localeEn, 'en');
  }
}
