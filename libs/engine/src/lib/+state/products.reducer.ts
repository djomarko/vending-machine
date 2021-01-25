import {
    createEntityAdapter,
    EntityAdapter,
    EntityState,
    Update,
} from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import {
    DispenseProduct,
    Errors,
    Messages,
    Product,
} from '@vending-machine/models';

import * as ProductsActions from './products.actions';

export const PRODUCTS_FEATURE_KEY = 'products';

export interface State extends EntityState<Product> {
    message?: string | null;
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
    message: null,
    dispense: null,
});

const productsReducer = createReducer(
    initialState,
    on(ProductsActions.loadProducts, (state, { products }) =>
        productsAdapter.setAll(products, state)
    ),
    on(ProductsActions.stockUpProducts, (state, { productName, quantity }) => {
        if (quantity <= 0) {
            return { ...state, message: Errors.NEGATIVE_STOCK };
        }

        const product = state.entities[productName];
        if(!product || !!state.dispense){
            return state;
        }

        const update: Update<Product> = {
            id: productName,
            changes: {
                quantity: product.quantity + quantity,
            },
        };
        return productsAdapter.updateOne(update, {
            ...state,
            message: `${Messages.RESUPPLIED} ${quantity} ${productName}(s)`,
        });
    }),
    on(ProductsActions.purchaseProducts, (state, { productName, payment }) => {
        if (state.dispense) {
            return state;
        }

        const product = state.entities[productName];
        if (!product) {
            return state;
        }

        if (!payment || product.price > payment) {
            return { ...state, message: Errors.INSUFFICIENT_MONEY };
        }

        if (product.quantity === 0) {
            return { ...state, message: Errors.INSUFFICIENT_STOCK };
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
            message: Messages.DISPENSING,
            dispense: {
                productName,
                change,
            },
        });
    }),
    on(ProductsActions.dispensedProduct, (state) => {
        return { ...state, dispense: null, message: null };
    })
);

export function reducer(state: State | undefined, action: Action) {
    return productsReducer(state, action);
}
