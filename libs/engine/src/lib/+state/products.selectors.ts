import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Messages } from '@vending-machine/models';
import {
    PRODUCTS_FEATURE_KEY,
    productsAdapter,
    ProductsPartialState,
    State,
} from './products.reducer';

// Lookup the 'Products' feature state managed by NgRx
export const getProductsState = createFeatureSelector<
    ProductsPartialState,
    State
>(PRODUCTS_FEATURE_KEY);

const { selectAll, selectEntities } = productsAdapter.getSelectors();

export const getAllProducts = createSelector(getProductsState, (state: State) =>
    selectAll(state)
);

const getProductsEntities = createSelector(
    getProductsState,
    (state: State) => selectEntities(state)
);

export const getProduct = createSelector(
    getProductsEntities,
    (entities, { id }) => id && entities[id]
);

export const productDispensing = createSelector(
    getProductsState,
    (state: State) => state.dispense
);

export const getMessage = createSelector(
    getProductsState,
    ({ message }: State) => message || Messages.WELCOME
);
