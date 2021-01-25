import { TestBed } from '@angular/core/testing';
import { ROOT_EFFECTS_INIT } from '@ngrx/effects';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { DataPersistence, NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { INITIAL_STOCK } from '@vending-machine/engine';

import { Observable } from 'rxjs';
import * as ProductsActions from './products.actions';

import { ProductsEffects } from './products.effects';

describe('ProductsEffects', () => {
    let actions: Observable<any>;
    let effects: ProductsEffects;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NxModule.forRoot()],
            providers: [
                ProductsEffects,
                DataPersistence,
                provideMockActions(() => actions),
                provideMockStore(),
                {
                    provide: INITIAL_STOCK,
                    useValue: [{ name: 'can', price: 1.2, quantity: 1 }],
                },
            ],
        });

        effects = TestBed.inject(ProductsEffects);
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
});
