import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/shared/_services/product.service';

@Component({
  selector: 'app-product-type-delete',
  templateUrl: './product-type-delete.component.html',
  styleUrls: ['./product-type-delete.component.scss'],
})
export class ProductTypeDeletePopupComponent implements OnInit {
    IDForDeletion;
  constructor(
    private toastr: ToastrService,
    private productService: ProductService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data) {
        if (this.data.id) {
            this.IDForDeletion = this.data.id
            console.log(this.IDForDeletion);
        }
    }
  }
  yes() {
    this.productService
    .deleteProductType(this.IDForDeletion)
    .subscribe(
      (res) => {
        this.toastr.success('პროდუქტის ტიპი და მისი შვილები წაიშალა.');

        this.dialogRef.close({ delete: true });
      },

      (error) => {
        this.toastr.error(
            'პროდუქტის ტიპის წაშლისას დაფიქსირდა შეცდომა.')

        this.dialogRef.close();
      }
    );

  }
  no() {
    this.dialogRef.close();
  }
}
