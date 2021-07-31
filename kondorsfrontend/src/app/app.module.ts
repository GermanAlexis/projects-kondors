import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material/material.module';
import {MatNativeDateModule} from '@angular/material/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserComponent } from './pages/users/user/user.component';
import { HomeComponent } from './shared/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { ModiftyUserComponent } from './pages/users/modifty-user/modifty-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './pages/products/product/products.component';
import { ModifyProductComponent } from './pages/products/modify-product/modify-product.component';
import { InvoiceComponent } from './pages/invoices/invoice/invoice.component';
import { InvoicesComponent } from './pages/invoices/invoices/invoices.component';
import { FormsModule } from '@angular/forms';
import { ModalinoviceComponent } from './pages/invoices/invoices/modalinovice/modalinovice.component';
import { ShearedComponent } from './shared/search/sheared/sheared.component';
import { Ng2IziToastModule } from 'ng2-izitoast';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent,
    NavbarComponent,
    ModiftyUserComponent,
    ProductsComponent,
    ModifyProductComponent,
    InvoiceComponent,
    InvoicesComponent,
    ModalinoviceComponent,
    ShearedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2IziToastModule
  ],
providers: [MatNativeDateModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
