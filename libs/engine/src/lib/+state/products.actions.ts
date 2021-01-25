import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Errors, Product, UpdateStock } from '@vending-machine/models';

export const loadProducts = createAction(
    '[Products] Load Initial Products',
    props<{ products: Product[] }>()
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
    props<UpdateStock>()
);

export const updateProductStock = createAction(
    '[Products/Effect] Update product stock',
    props<Update<Product>>()
);

export const purchaseProducts = createAction(
    '[Product/UI] Purchase Product',
    props<{ productName: string; payment: number }>()
);

export const dispensingProduct = createAction(
    '[Product/Effect] Dispensing Product',
    props<{ product: string; change: number }>()
);

export const dispensedProduct = createAction(
    '[Product/Effect] Dispensing Product',
    props<{ product: string; change: number }>()
);
