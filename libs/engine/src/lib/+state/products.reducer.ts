import {
    createEntityAdapter,
    EntityAdapter,
    EntityState,
    Update,
} from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { DispenseProduct, Errors, Product } from '@vending-machine/models';

import * as ProductsActions from './products.actions';

export const PRODUCTS_FEATURE_KEY = 'products';

export interface State extends EntityState<Product> {
    error?: Errors | string | null; // last known error (if any)
    isDispensing: boolean;
    dispense: DispenseProduct | null;
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
    dispense: null,
});

const productsReducer = createReducer(
    initialState,
    on(ProductsActions.loadProducts, (state, { products }) =>
        productsAdapter.setAll(products, state)
    ),
    on(ProductsActions.stockUpProducts, (state, { productName, quantity }) => {
        if (quantity <= 0) {
            return { ...state, error: Errors.NEGATIVE_STOCK };
        }

        const product = state.entities[productName];

        const update: Update<Product> = {
            id: productName,
            changes: {
                quantity: product.quantity + quantity,
            },
        };
        return productsAdapter.updateOne(update, state);
    }),
    on(ProductsActions.purchaseProducts, (state, { productName, payment }) => {
        if (state.dispense) {
            return state;
        }

        const product = state.entities[productName];
        if (!product) {
            return state;
        }

        if (product.price > payment) {
            return { ...state, error: Errors.INSUFFICIENT_MONEY };
        }

        const change = payment - product.price;

        const update: Update<Product> = {
            id: productName,
            changes: {
                quantity: product.quantity - 1,
            },
        };

        return productsAdapter.updateOne(update, {
            ...state,
            dispense: {
                productName,
                change,
            },
        });
    }),
    on(ProductsActions.dispensedProduct, (state) => {
        return {...state, dispense: null};
    }),
    on(ProductsActions.resetProductsError, (state) => {
        if (!state.error) {
            return state;
        }
        return {
            ...state,
            error: null,
        };
    })
);

export function reducer(state: State | undefined, action: Action) {
    return productsReducer(state, action);
}
