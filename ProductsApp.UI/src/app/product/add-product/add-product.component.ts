import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { ProductService } from "src/app/shared/_services/product.service";
import { AddCountryPopupComponent } from "../add-country/add-country.component";

@Component({
    selector: "app-add-product",
    templateUrl: "./add-product.component.html",
    styleUrls: ["./add-product.component.scss"],
})
export class AddProductPopupComponent implements OnInit {
    addProductForm = new FormGroup({
        productCode: new FormControl(null, Validators.required),
        productName: new FormControl(null, Validators.required),
        productPrice: new FormControl(null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
        countryID: new FormControl(null, Validators.required),
        startDate: new FormControl(null, Validators.required),
        endDate: new FormControl(null, Validators.required),
    });

    dataForEdit;
    selectedProductTypeID;
    countries;
    constructor(
        private dialog: MatDialog,
        private productService: ProductService,
        private dialogRef: MatDialogRef<AddProductPopupComponent>,
        private toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

    ngOnInit(): void {
        this.productService.getCountries().subscribe((res) => this.countries = res);
        if (this.data) {
            if (this.data.selectedProductRow) {
                this.dataForEdit = this.data.selectedProductRow;
                this.addProductForm.patchValue(this.dataForEdit);
            }
            this.selectedProductTypeID = this.data.selectedProductTypeID;
        }
    }

    addNewCountry() {
        const dialogRef = this.dialog.open(AddCountryPopupComponent);
        dialogRef.afterClosed().subscribe((res) => {
            if (res) {
                this.countries.push(res);
                this.addProductForm.get('countryID').setValue(res.id);
            }
        });
    }

    onClose() {
        this.dialogRef.close();
    }
    onSavedClose() {
        let startDate: string;
        let endDate: string;
        if (typeof this.addProductForm.value.startDate !== 'string') {
            startDate = this.addProductForm.value.startDate.toISOString();
            endDate = this.addProductForm.value.endDate.toISOString();
        } else {
            startDate = this.addProductForm.value.startDate;
            endDate = this.addProductForm.value.endDate;
        }
        let dataForSend = {
            ...this.addProductForm.value,
            startDate,
            endDate,
            productTypeID: this.selectedProductTypeID
        }
        console.log("test15");
        console.log(dataForSend);
        console.log("test15");

        if (this.dataForEdit) {
            dataForSend = { ...dataForSend, id: this.dataForEdit.id }
            this.productService
                .updateProduct({ ...dataForSend })
                .subscribe(
                    (res) => {
                        this.toastr.success('პროდუქტი წარმატებით დარედაქტირდა.');
                        this.dialogRef.close({
                            ...res
                        });
                    },

                    (error) => {
                        this.toastr.error(
                            'პროდუქტის რედაქტირებისას დაფიქსირდა შეცდომა.')

                        this.dialogRef.close();
                    }
                );
        }
        else {
            this.productService
                .addProduct({ ...dataForSend })
                .subscribe(
                    (res) => {
                        this.toastr.success('პროდუქტი წარმატებით დაემატა.');
                        this.dialogRef.close({
                            ...res
                        });
                    },

                    (error) => {
                        this.toastr.error(
                            'პროდუქტის დამატებისას დაფიქსირდა შეცდომა.')

                        this.dialogRef.close();
                    }
                );
        }
    }
}