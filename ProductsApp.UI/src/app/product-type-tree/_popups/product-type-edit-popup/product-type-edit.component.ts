import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms'
import { ProductService } from "src/app/shared/_services/product.service";
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: "app-product-type-edit",
    templateUrl: "./product-type-edit.component.html",
    styleUrls: ["./product-type-edit.component.scss"],
})
export class ProductTypeEditPopupComponent implements OnInit {
    editProductTypeForm = new FormGroup({
        productTypeName: new FormControl(null, Validators.required),
    });
    // public string ProductTypeName { get; set; }
    //     public Guid? FutureParentID { get; set; }
    //     public Guid? FutureChildID { get; set; }
    //     public Guid? FutureChildsParentID { get; set; }
    selectedRow;
    constructor(
        private dialogRef: MatDialogRef<ProductTypeEditPopupComponent>,
        private toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private productService: ProductService,
    ) { }

    ngOnInit(): void {
        if (this.data) {
            if (this.data.selectedRow) {
                this.selectedRow = this.data.selectedRow
                console.log(this.selectedRow);
                this.editProductTypeForm.patchValue(this.selectedRow);
            }
        }
    }
    onClose() {
        this.dialogRef.close();
    }
    onSavedClose() {
        console.log(this.editProductTypeForm.get("productTypeName").value);
        let dataForSend;
        dataForSend = {
            ...this.selectedRow,
            productTypeName: this.editProductTypeForm.get("productTypeName").value,
        }
        
        
        console.log(dataForSend);
        this.productService
        .editProductType({
          ...dataForSend
        })
        .subscribe(
          (res) => {
            this.toastr.success('პროდუქტის ტიპი წარმატებით დარედაქტირდა.');
  
            this.dialogRef.close({
              ...res
            });
          },
  
          (error) => {
            this.toastr.error(
                'პროდუქტის ტიპის რედაქტირებისას დაფიქსირდა შეცდომა.')

            this.dialogRef.close();
          }
        );
    }

}