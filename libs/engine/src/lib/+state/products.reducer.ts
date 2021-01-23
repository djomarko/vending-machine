import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Errors } from '../models/errors';

import * as ProductsActions from './products.actions';
import { ProductsEntity } from './products.models';

export const PRODUCTS_FEATURE_KEY = 'products';

export interface State extends EntityState<ProductsEntity> {
    error?: Errors | string | null; // last known error (if any)
    isDispensing: boolean;
}

export interface ProductsPartialState {
    readonly [PRODUCTS_FEATURE_KEY]: State;
}

export const productsAdapter: EntityAdapter<ProductsEntity> = createEntityAdapter<ProductsEntity>(
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
