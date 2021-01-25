import { Errors, Product } from '@vending-machine/models';
import * as ProductsActions from './products.actions';
import { State, initialState, reducer } from './products.reducer';

describe('Products Reducer', () => {
    const productName = 'PRODUCT-AAA';
    const createProductsEntity = (name = '', price = 1.2, quantity = 1) =>
        ({
            name,
            price,
            quantity,
        } as Product);

    it('loadProducts() should return set the list of known Products', () => {
        const products = [
            createProductsEntity(productName),
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
                    'PRODUCT-AAA': createProductsEntity(productName),
                    'PRODUCT-BBB': createProductsEntity('PRODUCT-BBB'),
                },
                message: null,
                dispense: null,
            };
        });

        describe('stockUpProducts()', () => {
            it('should check the quantity supplied is not negative value', () => {

                const action = ProductsActions.stockUpProducts({productName, quantity: -1});
                const result = reducer(state, action);
                expect(result.message).toBe(Errors.NEGATIVE_STOCK);
                expect(result.entities[productName].quantity).toBe(1);
            });

            it('should resupply the specified product', () => {
                const action = ProductsActions.stockUpProducts({productName, quantity: 20});
                const result = reducer(state, action);
                expect(result.message).toBe(`Resupplied with 20 ${productName}(s)`);
                expect(result.entities[productName].quantity).toBe(21);
            });

            it('should only resupply the product that exist in the list', () => {
                const action = ProductsActions.stockUpProducts({productName: 'UNKOWN-PRODUCT', quantity: 20});
                const result = reducer(state, action);
                expect(result.message).toBe(null);
            });

            it('should wait till dispense state is done', () => {
                const action = ProductsActions.stockUpProducts({productName, quantity: 20});
                state.dispense = {
                    productName,
                    change: 0
                };
                const result = reducer(state, action);
                expect(result.message).toBe(null);
                expect(result.entities[productName].quantity).toBe(1);
            });
        });

        describe('purchaseProducts()', () => {
            it('should reduce the quantity by 1 and set dispense state', () => {
                const action = ProductsActions.purchaseProducts({productName, payment: 20});

                const result = reducer(state, action);
                expect(result.message).toBe("Processing...");
                expect(result.entities[productName].quantity).toBe(0);
                expect(result.dispense).toEqual({
                    productName,
                    change: 18.8
                });
            });

            it('should check that is not already in dispense state', () => {
                const action = ProductsActions.purchaseProducts({productName, payment: 20});
                state.dispense = {
                    productName,
                    change: 0
                };

                const result = reducer(state, action);
                expect(result.message).toBe(null);
                expect(result.entities[productName].quantity).toBe(1);
            });

            it('should check if there sufficient money dispensed', () => {
                const action = ProductsActions.purchaseProducts({productName, payment: 1});
                const result = reducer(state, action);
                expect(result.message).toBe("Insufficient money");
                expect(result.entities[productName].quantity).toBe(1);
            });

            it('should check if there sufficient stock for the product', () => {
                const action = ProductsActions.purchaseProducts({productName, payment: 10});
                state.entities[productName].quantity = 0;

                const result = reducer(state, action);
                expect(result.message).toBe("Out of stock");
                expect(result.entities[productName].quantity).toBe(0);
            });

        });

        describe('dispensedProduct()', () => {
            it('should reset the messages and dispensed state', () => {
                const action = ProductsActions.dispensedProduct();
                state.message = 'Processing...';
                state.dispense = {
                    productName,
                    change: 0
                };

                const result = reducer(state, action);
                expect(result.message).toBe(null);
                expect(result.dispense).toBe(null);
            });
        });
    });
});
