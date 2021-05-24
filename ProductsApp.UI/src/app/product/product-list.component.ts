import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ToastrService } from "ngx-toastr";
import { ProductTypeComponent } from "../product-type-tree/product-type.component";
import { ProductService } from "../shared/_services/product.service";
import { AddProductPopupComponent } from "./add-product/add-product.component";
import { DeleteProductPopupComponent } from "./delete-product/delete-product.component";
import { DiagramaComponent } from "./diagrama/diagrama.component";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
  productListTable = new MatTableDataSource<any>();
  displayedColumns = ["productCode", "productName", "productPrice"];
  productList;
  @Input() selectedRow;
  selectedProductRow;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private productService: ProductService,
    private toastr: ToastrService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.productListTable.sort = this.sort;
  }

  ngOnChanges(changes: any) {
    if (changes.selectedRow.currentValue) {
      this.productService.getProductsByProductTypeID(changes.selectedRow.currentValue.id).subscribe((res) => {
        console.log("test11");
        console.log(res);
        console.log("test11");
        this.productList = res;
        this.productListTable.data = res;
        this.productListTable.sort = this.sort;
        console.log(this.productListTable);

      });
      console.log("test10");
      console.log(changes.selectedRow.currentValue)
      console.log("test10");
    }
  }

  getProductRow(row) {
    this.selectedProductRow = row;
  }

  openPopup() {

  }

  addProduct() {
    if (!this.selectedRow || !this.selectedRow.id) {
      console.log("test11");
      this.toastr.error("გთხოვთ აირჩიოთ პროდუქტის ტიპი!");
    }
    const data = {
      selectedProductTypeID: this.selectedRow.id
    }
    const dialogRef = this.dialog.open(AddProductPopupComponent, { data });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        console.log("test3");
        console.log(res);
        let changedData = this.productListTable.data;
        changedData.push(res);
        this.productListTable.data = changedData;

        console.log("test3");
      }
    });
  }

  updateProduct() {
    if (!this.selectedRow || !this.selectedRow.id || !this.selectedProductRow) {
      this.toastr.error("გთხოვთ აირჩიოთ პროდუქტის ტიპი და პროდუქტი!");
    }
    else {
      const data = {
        selectedProductRow: this.selectedProductRow,
        selectedProductTypeID: this.selectedRow.id
      }
      const dialogRef = this.dialog.open(AddProductPopupComponent, { data });
      dialogRef.afterClosed().subscribe((res) => {
        if (res) {
          let changedData = this.productListTable.data;
          const index = changedData.indexOf(this.selectedProductRow);
          changedData[index] = res;
          this.productListTable.data = changedData;
          this.selectedProductRow = res;
        }
      });
    }
  }

  onDeleteProduct() {
    if (!this.selectedProductRow) {
      this.toastr.error("გთხოვთ აირჩიოთ წასაშლელი პროდუქტი!");
    }
    if (this.selectedRow) {
      const dialogRef = this.dialog
        .open(DeleteProductPopupComponent, {
          data: {
            id: this.selectedProductRow.id,
          },
        })
        .afterClosed()
        .subscribe((res) => {
          if (res) {
            let changedData = this.productListTable.data
            const index = changedData.indexOf(this.selectedProductRow);
            changedData.splice(index, 1);
            this.productListTable.data = changedData;
            this.selectedProductRow = null;
          }
        });
    }
  }

  openDiagrama() {
    const dialogRef = this.dialog.open(DiagramaComponent, { data: this.productListTable.data });
  }
}