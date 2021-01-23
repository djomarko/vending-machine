import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseDashboardComponent } from './user-dashboard/purchase-dashboard.component';
import { ProductDisplayComponent } from './product-display/product-display.component';
import { IncreaseStockComponent } from './increase-stock/increase-stock.component';



@NgModule({
  declarations: [PurchaseDashboardComponent, ProductDisplayComponent, IncreaseStockComponent],
  imports: [
    CommonModule
  ]
})
export class UiComponentsModule { }
