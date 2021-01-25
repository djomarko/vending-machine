import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { DispenseData, Product, ProductPurchase, UpdateStock } from '@vending-machine/models';
import { EMPTY, Observable } from 'rxjs';
import { delay, filter, map, switchMap, tap } from 'rxjs/operators';
import * as ProductActions from '../../+state/products.actions';
import { ProductsPartialState } from '../../+state/products.reducer';
import * as ProductSelectors from '../../+state/products.selectors';
import { DispensedProductComponent } from '@vending-machine/ui-components';
import { PurchaseDashboardComponent } from '@vending-machine/ui-components';

@UntilDestroy()
@Component({
    selector: 'vm-machine-container',
    templateUrl: './machine-container.component.html',
    styleUrls: ['./machine-container.component.scss'],
})
export class MachineContainerComponent implements OnInit {
    @ViewChild(PurchaseDashboardComponent)
    dashboard: PurchaseDashboardComponent;

    public products$: Observable<Product[]>;
    public message$: Observable<string>;
    public makeNoise = false;

    constructor(
        private store$: Store<ProductsPartialState>,
        private dialog: MatDialog
    ) {}

    public ngOnInit() {
        this.store$.dispatch(ProductActions.init());

        this.products$ = this.store$.select(ProductSelectors.getAllProducts);
        this.message$ = this.store$.select(ProductSelectors.getMessage);

        this.store$
            .select(ProductSelectors.productDispensing)
            .pipe(
                switchMap((dispense) => {
                    if (!dispense) {
                        return EMPTY;
                    }
                    return this.store$
                        .select((state) =>
                            ProductSelectors.getProduct(state, {
                                id: dispense.productName,
                            })
                        )
                        .pipe(
                            map((product) => ({
                                product,
                                change: dispense.change,
                            }))
                        );
                }),
                filter((data) => !!data),
                tap(() => (this.makeNoise = true)),
                delay(3000),
                tap(() => (this.makeNoise = false)),
                untilDestroyed(this)
            )
            .subscribe((data) => this.createDialog(data));
    }

    private createDialog(data: DispenseData) {
        this.dashboard.resetPayment();
        const dialogRef = this.dialog.open(DispensedProductComponent, { data });

        dialogRef.afterClosed().subscribe(() => {
            this.store$.dispatch(ProductActions.dispensedProduct());
        });
    }

    public onProductsAdded($event: UpdateStock) {
        this.store$.dispatch(ProductActions.stockUpProducts($event));
    }

    public onProductPurchase($event: ProductPurchase) {
        this.store$.dispatch(ProductActions.purchaseProducts($event));
    }
}
