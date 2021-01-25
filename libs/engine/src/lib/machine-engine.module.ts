import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { Product } from '@vending-machine/models';
import { UiComponentsModule } from '@vending-machine/ui-components';
import { ProductsEffects } from './+state/products.effects';
import * as fromProducts from './+state/products.reducer';
import { MachineContainerComponent } from './components/machine-container/machine-container.component';

export const INITIAL_STOCK = new InjectionToken<Product[]>('initial stock');

@NgModule({
    declarations: [MachineContainerComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        UiComponentsModule,
        StoreModule.forFeature(
            fromProducts.PRODUCTS_FEATURE_KEY,
            fromProducts.reducer
        ),
        EffectsModule.forFeature([ProductsEffects]),
    ],
    providers: [{ provide: INITIAL_STOCK, useValue: [] }],
    exports: [MachineContainerComponent],
})
export class MachineEngineModule {}
