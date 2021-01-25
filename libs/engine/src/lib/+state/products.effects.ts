import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Product } from '@vending-machine/models';
import { map } from 'rxjs/operators';
import { INITIAL_STOCK } from '../initial-stock.token';
import * as ProductsActions from './products.actions';

@Injectable()
export class ProductsEffects {
    /**
     * Load production on initial load
     */
    init$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsActions.init),
            map(() => ProductsActions.loadProducts({ products: this.products }))
        )
    );

    constructor(
        private actions$: Actions,
        @Inject(INITIAL_STOCK) private products: Product[] = []
    ) {}
}
