import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Product, ProductPurchase, UpdateStock } from '@vending-machine/models';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as ProductActions from '../../+state/products.actions';
import { getAllProducts } from '../../+state/products.selectors';

@Component({
  selector: 'vm-machine-container',
  templateUrl: './machine-container.component.html',
  styleUrls: ['./machine-container.component.scss']
})
export class MachineContainerComponent implements OnInit {

    public products$: Observable<Product[]>;

    constructor(private store$: Store, public dialog: MatDialog) {
        this.products$ = this.store$
            .select(getAllProducts)
            .pipe(tap((x) => console.log(x)));
    }

    ngOnInit() {
        const dialogRef = this.dialog.open(DialogContentExampleDialog);

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    public onProductsAdded($event: UpdateStock){
        this.store$.dispatch(ProductActions.stockUpProducts($event));
    }

    public onProductPurchase($event: ProductPurchase){
        this.store$.dispatch(ProductActions.purchaseProducts($event));
    }
}
