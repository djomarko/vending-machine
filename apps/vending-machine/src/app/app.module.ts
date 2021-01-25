import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MachineEngineModule } from '@vending-machine/engine';
import { UiComponentsModule } from '@vending-machine/ui-components';
import { ProductsEffects } from '../../../../libs/engine/src/lib/+state/products.effects';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        MachineEngineModule,
        UiComponentsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([ProductsEffects]),
        StoreDevtoolsModule.instrument(),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
