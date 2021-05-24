import { Inject, Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductService {
  constructor(
    protected http: HttpClient,
    @Inject('BACK_URL') private baseUrl: string
  ) { }

  getProductTypes() {
    return this.http.get<any[]>(
      this.baseUrl + 'api/Product/GetProductTypes'
    );
  }

  AddProductType(model) {
    return this.http.post(
      this.baseUrl + 'api/Product/AddProductType',
      model
    );
  }

  deleteProductType(id: string) {
    return this.http.delete(
      this.baseUrl + "api/Product/DeleteProductType/" + id
    );
  }


  getProductsByProductTypeID(id: string) {
    return this.http.get<any[]>(
      this.baseUrl + 'api/Product/GetProductsByProductTypeID/' + id
    );
  }

  getCountries() {
    return this.http.get<any[]>(
      this.baseUrl + 'api/Product/GetCountries'
    );
  }

  addCountry(countryName: string) {
    return this.http.post(
      this.baseUrl + 'api/Product/AddCountry/' +
      countryName, null
    );
  }

  addProduct(model) {
    return this.http.post(
      this.baseUrl + 'api/Product/AddProduct',
      model
    );
  }

  updateProduct(model) {
    return this.http.post(
      this.baseUrl + 'api/Product/UpdateProduct',
      model
    );
  }

  deleteProduct(id: string) {
    return this.http.delete(
      this.baseUrl + "api/Product/DeleteProduct/" + id
    );
  }

  editProductType(model) {
    return this.http.post(
      this.baseUrl + 'api/Product/EditProductType',
      model
    );
  }
}