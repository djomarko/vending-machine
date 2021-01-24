import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Errors, Product } from '@vending-machine/models';
import { combineLatest, of } from 'rxjs';
import { exhaustMap, filter, map, take, timeout } from 'rxjs/operators';
import * as stock from '../stock.json';
import * as ProductsActions from './products.actions';
import { ProductsPartialState } from './products.reducer';
import { getProduct, isProductDispensing } from './products.selectors';

@Injectable()
export class ProductsEffects {
    /**
     * Load production on initial load
     */
    init$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ROOT_EFFECTS_INIT),
            map(() => {
                const products: Product[] = stock;
                return ProductsActions.loadProducts({ products });
            })
        )
    );

    /**
     * increase the quantity of a product
     */
    addStock$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsActions.stockUpProducts),
            exhaustMap((action) => {
                if (action.quantity <= 0) {
                    return of(
                        ProductsActions.setProductsError({
                            error: Errors.NEGATIVE_STOCK,
                        })
                    );
                }
                return this.store$
                    .select((state) => getProduct(state, { id: action.id }))
                    .pipe(
                        take(1),
                        filter((product) => !!product),
                        map((product: Product) => {
                            return ProductsActions.updateProductStock({
                                id: product.name,
                                changes: {
                                    quantity:
                                        product.quantity + action.quantity,
                                },
                            });
                        })
                    );
            })
        )
    );

    /**
     * User tries to purchase a product
     */
    purchasingProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsActions.purchaseProducts),
            exhaustMap((action) =>
                combineLatest([
                    this.store$.select((state) =>
                        getProduct(state, { id: action.id })
                    ),
                    this.store$.select(isProductDispensing),
                ]).pipe(
                    filter(
                        ([product, isDispensing]) => !isDispensing && !!product
                    ),
                    map(([product]) => {
                        if (action.payment < product.cost) {
                            return ProductsActions.setProductsError({
                                error: Errors.INSUFFICIENT_MONEY,
                            });
                        }

                        return ProductsActions.dispensingProduct({
                            product: product.name,
                            change: action.payment - product.cost,
                        });
                    })
                )
            )
        )
    );

    DISPENSING_DURATION = 3000;

    /**
     * Once a product is successfully purchased. The engine takes time to dispense the product and the right change.
     */
    dispenseProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsActions.dispensingProduct),
            timeout(this.DISPENSING_DURATION),
            map(({ product, change }) =>
                ProductsActions.dispensedProduct({ product, change })
            )
        )
    );

    constructor(
        private actions$: Actions,
        private store$: Store<ProductsPartialState>
    ) {}
}
