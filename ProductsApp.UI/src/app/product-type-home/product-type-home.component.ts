import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ProductService } from "../shared/_services/product.service";

@Component({
    selector: "app-product-type-home",
    templateUrl: "./product-type-home.component.html",
    styleUrls: ["./product-type-home.component.scss"]
})

export class ProductTypeHomeComponent implements OnInit {
    productTypes;
    selectedRow;
    // @Output() emitSelectedRow: EventEmitter<any> = new EventEmitter<any>();

    constructor(private productService: ProductService) {}

    ngOnInit(): void {
        // this.productService.getProductTypes().subscribe((res) => { this.productTypes = this.nestedChildTraversal(res, 0); this.dataSource.data = this.productTypes; });
        this.productService.getProductTypes().subscribe((res) => this.productTypes = res );

    }

    getSelectedRow(event) {
        console.log("test9");
        console.log(event);
        this.selectedRow = event;
        // this.emitSelectedRow.emit(event);
    }
}