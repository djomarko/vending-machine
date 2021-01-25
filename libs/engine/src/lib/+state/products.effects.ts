import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Product } from '@vending-machine/models';
import { map } from 'rxjs/operators';
import * as stock from '../stock.json';
import * as ProductsActions from './products.actions';
import { ProductsPartialState } from './products.reducer';

@Injectable()
export class ProductsEffects {
    /**
     * Load production on initial load
     */
    init$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ROOT_EFFECTS_INIT),
            map(() => {
                const products: Product[] = stock.default;
                return ProductsActions.loadProducts({ products });
            })
        )
    );

    constructor(
        private actions$: Actions,
        private store$: Store<ProductsPartialState>
    ) {}
}
