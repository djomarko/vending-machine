import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiComponentsModule } from '@vending-machine/ui-components';
import * as fromProducts from './+state/products.reducer';
import { ProductsEffects } from './+state/products.effects';
import { MachineContainerComponent } from './components/machine-container/machine-container.component';

@NgModule({
    declarations: [MachineContainerComponent],
    imports: [
        CommonModule,
        UiComponentsModule,
        StoreModule.forFeature(
            fromProducts.PRODUCTS_FEATURE_KEY,
            fromProducts.reducer
        ),
        EffectsModule.forFeature([ProductsEffects]),
    ],
    exports: [MachineContainerComponent]
})
export class MachineEngineModule {}
