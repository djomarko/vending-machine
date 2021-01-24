import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Errors, Product } from '@vending-machine/models';

import * as ProductsActions from './products.actions';

export const PRODUCTS_FEATURE_KEY = 'products';

export interface State extends EntityState<Product> {
    error?: Errors | string | null; // last known error (if any)
    isDispensing: boolean;
}

export interface ProductsPartialState {
    readonly [PRODUCTS_FEATURE_KEY]: State;
}

export const productsAdapter: EntityAdapter<Product> = createEntityAdapter<Product>(
    {
        selectId: (instance) => instance.name,
    }
);

export const initialState: State = productsAdapter.getInitialState({
    error: null,
    isDispensing: false,
});

const productsReducer = createReducer(
    initialState,
    on(ProductsActions.loadProducts, (state, { products }) =>
        productsAdapter.setAll(products, state)
    ),
    on(ProductsActions.setProductsError, (state, { error }) => {
        if (!error) {
            return state;
        }
        return { ...state, error };
    }),
    on(ProductsActions.resetProductsError, (state) => {
        if (!state.error) {
            return state;
        }
        return {
            ...state,
            error: null,
        };
    }),
    on(ProductsActions.dispensingProduct, (state) => {
        return { ...state, isDispensing: true };
    }),
    on(ProductsActions.dispensedProduct, (state, { product: id }) => {
        const product = state.entities[id];
        if (!product) {
            return state;
        }
        const updates = { id, changes: { quantity: product.quantity - 1 } };
        return productsAdapter.updateOne(updates, {
            ...state,
            isDispensing: false,
        });
    })
);

export function reducer(state: State | undefined, action: Action) {
    return productsReducer(state, action);
}
