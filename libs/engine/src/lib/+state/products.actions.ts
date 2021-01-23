import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Errors } from '../models/errors';
import { ProductsEntity } from './products.models';

export const loadProducts = createAction(
    '[Products] Load Initial Products',
    props<{ products: ProductsEntity[] }>()
);

export const setProductsError = createAction(
    '[Products] Set error',
    props<{ error: Errors| string }>()
);

export const resetProductsError = createAction(
    '[Products] Reset error state'
);

export const stockUpProducts = createAction(
    '[Product/UI] Stock up product',
    props<{ id: string; quantity: number }>()
);

export const updateProductStock = createAction(
    '[Products/Effect] Update product stock',
    props<Update<ProductsEntity>>()
);

export const purchaseProducts = createAction(
    '[Product/UI] Purchase Product',
    props<{ id: string; payment: number }>()
);

export const dispensingProduct = createAction(
    '[Product/Effect] Dispensing Product',
    props<{ product: string; change: number }>()
);

export const dispensedProduct = createAction(
    '[Product/Effect] Dispensing Product',
    props<{ product: string; change: number }>()
);
