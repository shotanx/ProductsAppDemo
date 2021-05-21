import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from '@angular/material/table'
import { ProductService } from "../shared/_services/product.service";

@Component({
    selector: "app-product-type",
    templateUrl: "./product-type.component.html",
    styleUrls: ["./product-type.component.scss"],
  })
  export class ProductTypeComponent implements OnInit {
    dataSource = new MatTableDataSource();
    displayedColumns = ['expand', 'name'];
    expandData;
    productTypes;
    test = "&#9654;";
    hideTable = true;
    constructor(private productService: ProductService) { }

    ngOnInit(): void {
        this.productService.getProductTypes().subscribe((res) => {this.productTypes = res; this.dataSource = res; console.log(this.productTypes)});
     }
  }