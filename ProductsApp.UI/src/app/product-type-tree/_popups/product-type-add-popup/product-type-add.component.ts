import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms'
import { ProductService } from "src/app/shared/_services/product.service";
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: "app-product-type-add",
    templateUrl: "./product-type-add.component.html",
    styleUrls: ["./product-type-add.component.scss"],
})
export class ProductTypeAddPopupComponent implements OnInit {
    addProductTypeForm = new FormGroup({
        newProductTypeName: new FormControl(null, Validators.required),
        level: new FormControl(null, Validators.required),
    });
    // public string ProductTypeName { get; set; }
    //     public Guid? FutureParentID { get; set; }
    //     public Guid? FutureChildID { get; set; }
    //     public Guid? FutureChildsParentID { get; set; }
    selectedRow;
    constructor(
        private dialogRef: MatDialogRef<ProductTypeAddPopupComponent>,
        private toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private productService: ProductService,
    ) { }

    ngOnInit(): void {
        if (this.data) {
            if (this.data.selectedRow) {
                this.selectedRow = this.data.selectedRow
                console.log(this.selectedRow);
            }
            else {
                this.addProductTypeForm.get("level").setValue(1);
            }
        }
    }
    onClose() {
        this.dialogRef.close();
    }
    onSavedClose() {
        console.log(this.addProductTypeForm.get("newProductTypeName").value);
        let dataForSend;
        dataForSend = {
            productTypeName: this.addProductTypeForm.get("newProductTypeName").value,
        }
        if (this.selectedRow) {
            console.log("test6");
            console.log(this.selectedRow);
            console.log("test6");
            if (this.addProductTypeForm.get("level").value == 0) {
                dataForSend = {
                    ...dataForSend,
                    futureParentID: this.selectedRow.id
                }
            }
            else if (this.addProductTypeForm.get("level").value == 1) {
                dataForSend = {
                    ...dataForSend,
                    futureChildID: this.selectedRow.id,
                    futureChildsParentID: this.selectedRow.parentID
                }
            }
        }
        
        
        console.log(dataForSend);
        this.productService
        .AddProductType({
          ...dataForSend
        })
        .subscribe(
          (res) => {
            this.toastr.success('პროდუქტის ტიპი წარმატებით დაემატა.');
  
            this.dialogRef.close({
              ...res,
              level: this.addProductTypeForm.value.level,
              parentID: this.data?.id,
            });
          },
  
          (error) => {
            this.toastr.error(
                'პროდუქტის ტიპის დამატებისას დაფიქსირდა შეცდომა.')

            this.dialogRef.close();
          }
        );
        // console.log(this.actions);
        this.dialogRef.close({
            ...this.addProductTypeForm.value,
            // actionName: this.addHospitalForm.get("action").value.name,
            // actionID: this.addHospitalForm.get("action").value.id,
        });
    }

    // this.productService
    //   .pos({
    //     ParentID: this.data?.id,
    //     Level: this.serviceGroupForm.value.level,
    //     ServiceGroupName: this.serviceGroupForm.value.serviceGroupName,
    //   })
    //   .subscribe(
    //     (res) => {
    //       this.toastr.success('მომსახურების ჯგუფი წარმატებით დაემატა.');

    //       this.dialogRef.close({
    //         ...res,
    //         level: this.serviceGroupForm.value.level,
    //         parentID: this.data?.id,
    //       });
    //     },

    //     (error) => {
    //       if (errorRegex.test(error.error)) {
    //         this.toastr.error(error.error);
    //       } else {
    //         this.toastr.error(
    //           'მომსახურების ჯგუფის დამატებისას დაფიქსირდა შეცდომა.'
    //         );
    //       }
    //       this.dialogRef.close();
    //     }
    //   );
}