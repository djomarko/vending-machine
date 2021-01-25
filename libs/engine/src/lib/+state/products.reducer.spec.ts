import { Product } from '@vending-machine/models';
import * as ProductsActions from './products.actions';
import { State, initialState, reducer } from './products.reducer';

describe('Products Reducer', () => {
    const primaryProductName = 'PRODUCT-AAA';
    const createProductsEntity = (name = '', price = 1, quantity = 1) =>
        ({
            name,
            price,
            quantity,
        } as Product);

    it('loadProducts should return set the list of known Products', () => {
        const products = [
            createProductsEntity(primaryProductName),
            createProductsEntity('PRODUCT-zzz'),
        ];
        const action = ProductsActions.loadProducts({ products });

        const result: State = reducer(initialState, action);

        expect(result.ids.length).toBe(2);
        expect(result.message).toBeNull();
    });

    describe('unknown action', () => {
        it('should return the previous state', () => {
            const action = {} as any;

            const result = reducer(initialState, action);

            expect(result).toBe(initialState);
        });
    });

    describe('with loaded products', () => {
        let state: State;

        beforeEach(() => {
            state = {
                ids: ['PRODUCT-AAA', 'PRODUCT-BBB'],
                entities: {
                    'PRODUCT-AAA': createProductsEntity(primaryProductName),
                    'PRODUCT-BBB': createProductsEntity('PRODUCT-BBB'),
                },
                message: null,
                dispense: null,
            };
        });

        describe('setProductsError', () => {
            it('should set the error', () => {
                const action = ProductsActions.setProductsError({
                    error: 'ERROR',
                });
                const result = reducer(state, action);

                expect(result.message).toBe('ERROR');
            });
        });

        describe('resetProductsError', () => {
            it('should reset the error', () => {
                state.message = 'ERROR';

                const action = ProductsActions.resetProductsError();
                const result = reducer(state, action);

                expect(result.message).toBe(null);
            });
        });

        describe('updateProductStock', () => {
            it('should set the stock levels', () => {
                const action = ProductsActions.updateProductStock({
                    id: primaryProductName,
                    changes: {
                        quantity: 4,
                    },
                });
                const result = reducer(state, action);
                expect(result.entities[primaryProductName].quantity).toBe(4);
            });
        });
    });
});
