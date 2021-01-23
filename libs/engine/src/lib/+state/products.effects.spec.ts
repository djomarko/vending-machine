import { TestBed } from '@angular/core/testing';
import { ROOT_EFFECTS_INIT } from '@ngrx/effects';

import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { DataPersistence, NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { Observable } from 'rxjs';
import { Errors } from '../models/errors';
import * as ProductsActions from './products.actions';

import { ProductsEffects } from './products.effects';
import { ProductsPartialState } from './products.reducer';

describe('ProductsEffects', () => {
    let actions: Observable<any>;
    let effects: ProductsEffects;
    let store: MockStore<ProductsPartialState>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NxModule.forRoot()],
            providers: [
                ProductsEffects,
                DataPersistence,
                provideMockActions(() => actions),
                provideMockStore(),
            ],
        });

        effects = TestBed.inject(ProductsEffects);
        store = TestBed.inject(MockStore);
    });

    describe('init$', () => {
        it('should load the initial stock and price of a can into the machine when application loads', () => {
            actions = hot('-a-|', { a: { type: ROOT_EFFECTS_INIT } });

            const expected = hot('-a-|', {
                a: ProductsActions.loadProducts({
                    products: [{ name: 'can', price: 1.2, quantity: 1 }],
                }),
            });

            expect(effects.init$).toBeObservable(expected);
        });
    });

    describe('addStock$', () => {
        it('should send a error action if the quantity is negative', () => {
            actions = hot('-a-|', {
                a: ProductsActions.stockUpProducts({ id: 'can', quantity: -1 }),
            });

            const expected = hot('-a-|', {
                a: ProductsActions.setProductsError({
                    error: Errors.NEGATIVE_STOCK,
                }),
            });

            expect(effects.addStock$).toBeObservable(expected);
        });
        it('should send a error action if the quantity is 0', () => {
            actions = hot('-a-|', {
                a: ProductsActions.stockUpProducts({ id: 'can', quantity: 0 }),
            });

            const expected = hot('-a-|', {
                a: ProductsActions.setProductsError({
                    error: Errors.NEGATIVE_STOCK,
                }),
            });

            expect(effects.addStock$).toBeObservable(expected);
        });
        it('should send an update product stock by increasing the current stock', () => {
            store.setState({
                products: {
                    ids: ['can'],
                    entities: {
                        can: {
                            name: 'can',
                            price: 1.2,
                            quantity: 4,
                        },
                    },
                    isDispensing: false
                },
            });

            actions = hot('-a-|', {
                a: ProductsActions.stockUpProducts({ id: 'can', quantity: 10 }),
            });

            const expected = hot('-a-|', {
                a: ProductsActions.updateProductStock({
                    id: 'can',
                    changes: {
                        quantity: 14
                    }
                }),
            });

            expect(effects.addStock$).toBeObservable(expected);
        });
    });
});
