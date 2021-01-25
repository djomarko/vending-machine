import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DispensedProductComponent } from './dispensed-product/dispensed-product.component';
import { IncreaseStockComponent } from './increase-stock/increase-stock.component';
import { MessageDisplayComponent } from './message-display/message-display.component';
import { ProductDisplayComponent } from './product-display/product-display.component';
import { PurchaseDashboardComponent } from './purchase-dashboard/purchase-dashboard.component';

@NgModule({
    declarations: [
        PurchaseDashboardComponent,
        ProductDisplayComponent,
        IncreaseStockComponent,
        MessageDisplayComponent,
        DispensedProductComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatDialogModule,
        BrowserAnimationsModule,
    ],
    exports: [
        PurchaseDashboardComponent,
        ProductDisplayComponent,
        IncreaseStockComponent,
        MessageDisplayComponent,
        DispensedProductComponent,
    ],
})
export class UiComponentsModule {}
