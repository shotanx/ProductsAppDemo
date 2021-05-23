import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { ProductService } from "src/app/shared/_services/product.service";

@Component({
    selector: "app-add-country",
    templateUrl: "./add-country.component.html",
    styleUrls: ["./add-country.component.scss"],
})
export class AddCountryPopupComponent implements OnInit {
    addCountryForm = new FormGroup({
        countryName: new FormControl(null, Validators.required),
    });

    selectedRow;
    countries;
    constructor(
        private productService: ProductService,
        private dialogRef: MatDialogRef<AddCountryPopupComponent>,
        private toastr: ToastrService,
        // @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

    ngOnInit(): void { }

    onSavedClose() {
        this.productService
        .addCountry(this.addCountryForm.get("countryName").value)
        .subscribe(
          (res) => {
            this.toastr.success('ქვეყანა წარმატებით დაემატა.');
            this.dialogRef.close({
              ...res
            });
          },
  
          (error) => {
            this.toastr.error(
                'ქვეყნის დამატებისას დაფიქსირდა შეცდომა.')

            this.dialogRef.close();
          }
        );
    }

    onClose() {
        this.dialogRef.close();
    }
}