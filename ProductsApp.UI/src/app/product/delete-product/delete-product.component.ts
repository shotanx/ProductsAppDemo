import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/shared/_services/product.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss'],
})
export class DeleteProductPopupComponent implements OnInit {
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
    .deleteProduct(this.IDForDeletion)
    .subscribe(
      (res) => {
        this.toastr.success('პროდუქტი წარმატებით წაიშალა.');

        this.dialogRef.close({ delete: true });
      },

      (error) => {
        this.toastr.error(
            'პროდუქტის წაშლისას დაფიქსირდა შეცდომა.')

        this.dialogRef.close();
      }
    );

  }
  no() {
    this.dialogRef.close();
  }
}
