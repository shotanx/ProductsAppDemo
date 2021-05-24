import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, EventEmitter, Input, IterableDiffers, OnInit, Output } from "@angular/core";
import { MatTableDataSource } from '@angular/material/table'
import { ProductService } from "../shared/_services/product.service";
import { MdbTreeComponent } from 'ng-uikit-pro-standard';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ProductTypeAddPopupComponent } from "./_popups/product-type-add-popup/product-type-add.component";
import { MatDialog } from "@angular/material/dialog";
import { ProductTypeDeletePopupComponent } from "./_popups/product-type-delete-popup/product-type-delete.component";
import { ToastrService } from "ngx-toastr";
import { ProductTypeEditPopupComponent } from "./_popups/product-type-edit-popup/product-type-edit.component";

interface ProductType {
    id: string;
    productTypeName: string;
    parentID: string;
    children?: ProductType[];
}

interface ExampleFlatNode {
    id: string;
    expandable: boolean;
    productTypeName: string;
    parentID: string;
    level: number;
}

let TREE_DATA: ProductType[];
//  = [
//     {
//         name: 'Fruit',
//         children: [
//             { name: 'Apple' },
//             { name: 'Banana' },
//             { name: 'Fruit loops' },
//         ]
//     }, {
//         name: 'Vegetables',
//         children: [
//             {
//                 name: 'Green',
//                 children: [
//                     { name: 'Broccoli' },
//                     { name: 'Brussels sprouts' },
//                 ]
//             }, {
//                 name: 'Orange',
//                 children: [
//                     { name: 'Pumpkins' },
//                     { name: 'Carrots' },
//                 ]
//             },
//         ]
//     },
// ];

@Component({
    selector: "app-product-type",
    templateUrl: "./product-type.component.html",
    styleUrls: ["./product-type.component.scss"],
    // animations: [
    //     trigger('detailExpand', [
    //         state(
    //             'collapsed',
    //             style({ height: '0px', minHeight: '0', visibility: 'hidden' })
    //         ),
    //         state('expanded', style({ height: '*', visibility: 'visible' })),
    //         transition(
    //             'expanded <=> collapsed',
    //             animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
    //         ),
    //     ]),
    // ],
})
export class ProductTypeComponent implements OnInit {
    @Input() dataFromParent;
    // @Input() productTypes;
    // dataSource = new MatTableDataSource();
    displayedColumns = ['expand', 'name'];
    expandData;
    test = "&#9654;";
    hideTable = true;
    iterableDiffer;
    activeNode;

    selectedRow;
    @Output() emitSelectedRow: EventEmitter<any> = new EventEmitter<any>();
    constructor(private dialog: MatDialog,
        private toastr: ToastrService,
        private productService: ProductService,
        private iterableDiffers: IterableDiffers
    ) {
        this.iterableDiffer = iterableDiffers.find([]).create(null);
        // this.dataSource.data = TREE_DATA;
    }

    ngOnInit(): void {
        // this.productService.getProductTypes().subscribe((res) => { this.productTypes = this.nestedChildTraversal(res, 0); this.dataSource.data = this.productTypes; });
    }
    private _transformer = (node: ProductType, level: number) => {
        return {
            expandable: !!node.children && node.children.length > 0,
            id: node.id,
            productTypeName: node.productTypeName,
            parentID: node.parentID,
            level: level,
        };
    }

    treeControl = new FlatTreeControl<ExampleFlatNode>(
        node => node.level, node => node.expandable);

    treeFlattener = new MatTreeFlattener(
        this._transformer, node => node.level, node => node.expandable, node => node.children);

    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

    ngDoCheck() {
        let changes = this.iterableDiffer.diff(this.dataFromParent);
        if (changes) {
            console.log("test1");
            console.log(this.dataFromParent);
            console.log("test1");
            TREE_DATA = this.dataFromParent;
            this.dataSource.data = TREE_DATA;

            // this.dataSource.data = this.dataFromParent;
            TREE_DATA = this.dataFromParent;
            if (this.dataFromParent.length > 0) {
                this.hideTable = false;
            }
        }
    }

    selectNode(node) {
        console.log("test2");
        console.log(node);
        this.selectedRow = node;
        this.emitSelectedRow.emit(this.selectedRow);
    }

    addProducType() {
        const data = {
            selectedRow: this.selectedRow
        }
        const dialogRef = this.dialog.open(ProductTypeAddPopupComponent, { data });
        dialogRef.afterClosed().subscribe((res) => {
            this.productService.getProductTypes().subscribe((res) => this.dataFromParent = res );
            // let changedData = this.hospitalPaperTable.data;
            // if (res) {
            //     changedData.push(res);
            // }
            // this.hospitalPaperTable.data = changedData;
        });
    }

    editProducType() {
        if (!this.selectedRow) {
            this.toastr.error('რედაქტირებისთვის საჭიროა რომ აირჩიოთ პროდუქტის ტიპი.');
        }

        const data = {
            selectedRow: this.selectedRow
        }
        const dialogRef = this.dialog.open(ProductTypeEditPopupComponent, { data });
        dialogRef.afterClosed().subscribe((res) => {
            this.productService.getProductTypes().subscribe((res) => this.dataFromParent = res );
            // let changedItem = this.dataFromParent.filter(x => x.id = this.selectedRow.id)[0];

            // const index = changedData.indexOf(this.selectedRow);
            // console.log("test21");
            // console.log(changedData);
            // console.log(this.selectedRow);
            // console.log("test21");
            // console.log(index);
            // changedData[index] = res;
            // this.dataFromParent = changedData;
            // this.selectedRow = null;
            // this.ngDoCheck();
            // console.log("test3");
            // console.log(res);
            // console.log("test3");
        });

    }

    onDeleteProductType() {
        if (this.selectedRow) {

            const dialogRef = this.dialog
            .open(ProductTypeDeletePopupComponent, {
              data: {
                id: this.selectedRow.id,
              },
            })
            .afterClosed()
            .subscribe((res) => {
                this.productService.getProductTypes().subscribe((res) => this.dataFromParent = res );
            });
        }
      }

    // nestedChildTraversal(parents) {
    //     let result = [];
    //     let stack = [];
    //     parents.forEach((item) => {
    //         stack.push({ ...item, depth: 0 });

    //         while (stack.length > 0) {
    //             let current = stack.pop();

    //             let finalForm = {
    //                 id: current.id,
    //                 productTypeName: '--'.repeat(current.depth) + current.productTypeName,
    //                 depth: current.depth * 2,
    //                 symbol: '&#9654;',
    //             };

    //             result.push(finalForm);
    //             console.log(finalForm);
    //             if (current.children) {
    //                 current.children.forEach((element) => {
    //                     if (element) {
    //                         stack.push({ ...element, depth: current.depth + 1 });
    //                     }
    //                 });
    //             }
    //         }
    //     });

    //     return result;
    // }

    // nestedChildTraversal(parents, depth) {
    //     let result = [];
    //     let stack = [];
    //     parents.forEach((item) => {
    //         stack.push({ ...item, depth: depth });

    //         while (stack.length > 0) {
    //             let current = stack.pop();

    //             let finalForm = {
    //                 id: current.id,
    //                 productTypeName: current.productTypeName,
    //                 depth: current.depth * 2,
    //                 symbol: '&#9654;',
    //                 children: this.nestedChildTraversal(current.children, depth + 1)
    //             };

    //             result.push(finalForm);
    //         }
    //     });

    //     return result;
    // }

    // testMethod(row) {
    //     console.log(row);
    //     if (row.symbol == "&#9654;") {
    //         row.symbol = "&#9660;";
    //     }
    //     else {
    //         row.symbol = "&#9654;"
    //     }
    //     const changedData = this.dataSource.data;
    //     const rowIndex =  changedData.indexOf(row);
    //     row.children.forEach(x => { changedData.splice(rowIndex + 1, 0, x); console.log(x) });
    //     this.dataSource.data = changedData;
    //     // this.dataSource.data.push(row.children.foreach());
    //     console.log("test1");
    //     console.log(this.dataSource.data);
    // }
}