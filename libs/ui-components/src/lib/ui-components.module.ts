import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PurchaseDashboardComponent } from './purchase-dashboard/purchase-dashboard.component';
import { ProductDisplayComponent } from './product-display/product-display.component';
import { IncreaseStockComponent } from './increase-stock/increase-stock.component';
import { MessageDisplayComponent } from './message-display/message-display.component';



@NgModule({
  declarations: [PurchaseDashboardComponent, ProductDisplayComponent, IncreaseStockComponent, MessageDisplayComponent],
  imports: [
    CommonModule, FormsModule
  ]
})
export class UiComponentsModule { }
