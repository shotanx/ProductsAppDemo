import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { ProductTypeComponent } from './product-type/product-type.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductService } from './shared/_services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    ProductComponent,
    ProductTypeComponent,
    AppComponent
  ],
  imports: [
    MatIconModule,
    MatTableModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ModalModule
  ],
  providers: [
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
