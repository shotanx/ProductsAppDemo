import { DatePipe } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { ToastrService } from "ngx-toastr";
import { ProductService } from "src/app/shared/_services/product.service";

// interface DiagramaType {
//     id: string;
//     productTypeName: string;
//     parentID: string;
// }

@Component({
    selector: "app-diagrama",
    templateUrl: "./diagrama.component.html",
    styleUrls: ["./diagrama.component.scss"],
})
export class DiagramaComponent implements OnInit {
    addCountryForm = new FormGroup({
        countryName: new FormControl(null, Validators.required),
    });

    minDate;
    maxDate;
    diagramaSourcePre = [];
    diagramaSource;
    displayedColumns = [];
    constructor(
        private productService: ProductService,
        private dialogRef: MatDialogRef<DiagramaComponent>,
        private toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: any[],
    ) { }

    ngOnInit(): void {
        if (this.data) {
            if (this.data.length > 0) {
                this.minDate = this.data[0].startDate;
                this.maxDate = this.data[0].endDate;
                this.data.forEach(x => {
                    if (x.startDate < this.minDate) {
                        this.minDate = x.startDate;
                    }
                    if (x.endDate > this.maxDate) {
                        this.maxDate = x.endDate;
                    }
                })
            }
            this.minDate = new Date(this.minDate);
            this.maxDate = new Date(this.maxDate);
            console.log('test17');
            console.log(this.maxDate);
            console.log(this.minDate);
            console.log(this.minDate.getDate());
            console.log('test17');
            console.log(this.data);
            this.populateArray();
        }
    }

    populateArray() {
        // var min = new Date(this.minDate).getDay();
        // var max = new Date(this.maxDate).getDate();
        // var totalDays = max - min;
        var dateArray = [];
        var datePipe = new DatePipe('en-US');

        while (this.minDate < this.maxDate) {
            dateArray.push(new Date(this.minDate));
            this.minDate.setDate(this.minDate.getDate() + 1);
        }
        console.log(dateArray);
        var myArray = [];

        this.data.forEach(x => {
            let item = {};
            item['დასახელება'] = x.productName;
            dateArray.forEach(y => {
                let z = datePipe.transform(y, 'dd/MM/yyyy');
                if (y >= new Date(x.startDate) && y <= new Date(x.endDate)) {
                    item[z] = true;
                }
                else {
                    item[z] = false;
                }
            })
            myArray.push(item);
        })

        // var item1 = {
        //     დასახელება: 'დასახელება',
        //     date1: '3 ivnisi',
        //     date2: '4 ivnisi',
        //     date3: '5 ivnisi'
        // };
        // var item2 = {
        //     დასახელება: 'ვაშლი',
        //     date1: 'trfalseue',
        //     date2: 'true',
        //     date3: 'true'
        // }
        // myArray.push(item1);
        // myArray.push(item2);

        
        for (let v of myArray) {
            // obj[v.name] = v.value;
            console.log(v);
            this.diagramaSourcePre.push(v);
        }
        console.log(this.diagramaSourcePre);
        for( let v in this.diagramaSourcePre[0]){
            console.log(v);
            this.displayedColumns.push(v);
        }
        this.diagramaSource = new MatTableDataSource(this.diagramaSourcePre);
        console.log(this.diagramaSource);
        // obj = {};
    }
    testColumns(row) {
        console.log("test18");
        console.log(row);
        console.log("test18");
    }

    getNames(row, disCol) {
        if (row[disCol] != true && row[disCol] != false) {
            return row[disCol];
        }
        // return 5;
    }

    onSavedClose() {
        this.dialogRef.close();

        // this.productService
        // .addCountry(this.addCountryForm.get("countryName").value)
        // .subscribe(
        //   (res) => {
        //     this.toastr.success('ქვეყანა წარმატებით დაემატა.');
        //     this.dialogRef.close({
        //       ...res
        //     });
        //   },

        //   (error) => {
        //     this.toastr.error(
        //         'ქვეყნის დამატებისას დაფიქსირდა შეცდომა.')

        //     this.dialogRef.close();
        //   }
        // );
    }

    onClose() {
        this.dialogRef.close();
    }
}