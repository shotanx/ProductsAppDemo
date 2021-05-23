import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { ProductService } from "src/app/shared/_services/product.service";

@Component({
    selector: "app-diagrama",
    templateUrl: "./diagrama.component.html",
    styleUrls: ["./diagrama.component.scss"],
})
export class DiagramaComponent implements OnInit {
    addCountryForm = new FormGroup({
        countryName: new FormControl(null, Validators.required),
    });

    selectedRow;
    countries;
    constructor(
        private productService: ProductService,
        private dialogRef: MatDialogRef<DiagramaComponent>,
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