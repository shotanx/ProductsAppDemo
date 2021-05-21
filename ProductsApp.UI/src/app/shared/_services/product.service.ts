import { Inject, Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductService {
    constructor(
      protected http: HttpClient,
      @Inject('BACK_URL') private baseUrl: string
    ) {}

    getProductTypes() {
        return this.http.get<any>(
          this.baseUrl + 'api/Product/GetProductTypes'
        );
      }
}