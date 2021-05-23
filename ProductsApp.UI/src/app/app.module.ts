import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product/product-list.component';
import { ProductTypeComponent } from './product-type-tree/product-type.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductService } from './shared/_services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProductTypeHomeComponent } from './product-type-home/product-type-home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { ProductTypeAddPopupComponent } from './product-type-tree/_popups/product-type-add-popup/product-type-add.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { ToastrModule } from 'ngx-toastr';
import { ProductTypeDeletePopupComponent } from './product-type-tree/_popups/product-type-delete-popup/product-type-delete.component';
import { MatSortModule } from '@angular/material/sort';
import { AddProductPopupComponent } from './product/add-product/add-product.component';
import { AddCountryPopupComponent } from './product/add-country/add-country.component';
import { DiagramaComponent } from './product/diagrama/diagrama.component';

@NgModule({
  declarations: [
    DiagramaComponent,
    AddCountryPopupComponent,
    AddProductPopupComponent,
    ProductTypeDeletePopupComponent,
    ProductTypeAddPopupComponent,
    ProductTypeHomeComponent,
    ProductListComponent,
    ProductTypeComponent,
    AppComponent
  ],
  imports: [
    MatSortModule,
    ToastrModule,
    ToastrModule.forRoot({
      positionClass :'toast-bottom-right'
    }),
    MatRadioModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatCardModule,
    CommonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatTreeModule,
    MatIconModule,
    MatTableModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ModalModule
  ],
  providers: [
    // ProductTypeComponent,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
