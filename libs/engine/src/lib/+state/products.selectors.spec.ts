import { DispenseProduct, Product } from '@vending-machine/models';
import { initialState, productsAdapter } from './products.reducer';
import * as ProductsSelectors from './products.selectors';

describe('Products Selectors', () => {
    const getProductsId = (it) => it['name'];
    const createProductsEntity = (name = '', price = 1.2, quantity = 1) =>
        ({
            name,
            price,
            quantity,
        } as Product);

    let state;

    beforeEach(() => {
        state = {
            products: productsAdapter.setAll(
                [
                    createProductsEntity('PRODUCT-AAA'),
                    createProductsEntity('PRODUCT-BBB'),
                    createProductsEntity('PRODUCT-CCC'),
                ],
                {
                    ...initialState,
                    message: null,
                    dispense: null,
                }
            ),
        };
    });

    describe('Products Selectors', () => {
        it('getAllProducts() should return the list of Products', () => {
            const results = ProductsSelectors.getAllProducts(state);
            const selId = getProductsId(results[1]);

            expect(results.length).toBe(3);
            expect(selId).toBe('PRODUCT-BBB');
        });

        it('getProduct() should return the product if it exists', () => {
            const fn = ProductsSelectors.getProduct.projector;
            expect(fn(state.products.entities, { id: 'UNKNWON' })).toBe(undefined);
            expect(fn(state.products.entities, { id: 'PRODUCT-AAA' })).toEqual(
                expect.objectContaining({ name: 'PRODUCT-AAA' })
            );
        });

        it('productDispensing() should return the dispense state', () => {
            const dispenseState: DispenseProduct =  {
                productName: 'PRODUCT-AAA',
                change: 10.1
            }

            state.products.dispense = dispenseState;

            const results = ProductsSelectors.productDispensing(state);
            expect(results).toBe(dispenseState);
        });

        describe('getMessage()', () => {
           it('should return a welcome message if message state is empty', () => {
               const results = ProductsSelectors.getMessage(state);
               expect(results).toBe('Welcome! Try our products');
           });

            it(`should return message state if it's set`, () => {
                state.products.message = 'ERROR';
                const results = ProductsSelectors.getMessage(state);
                expect(results).toBe('ERROR');
            });
        });
    });
});
