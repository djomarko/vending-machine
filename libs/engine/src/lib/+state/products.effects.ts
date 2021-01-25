import { Inject, Injectable } from '@angular/core';
import {
    Actions,
    createEffect,
    ofType,
    ROOT_EFFECTS_INIT,
} from '@ngrx/effects';
import { INITIAL_STOCK } from '@vending-machine/engine';
import { Product } from '@vending-machine/models';
import { map } from 'rxjs/operators';
import * as ProductsActions from './products.actions';

@Injectable()
export class ProductsEffects {
    /**
     * Load production on initial load
     */
    init$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ROOT_EFFECTS_INIT),
            map(() => ProductsActions.loadProducts({ products: this.products }))
        )
    );

    constructor(
        private actions$: Actions,
        @Inject(INITIAL_STOCK) private products: Product[]
    ) {}
}
