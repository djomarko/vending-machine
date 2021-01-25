import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product, ProductPurchase } from '@vending-machine/models';

@Component({
    selector: 'vm-purchase-dashboard',
    templateUrl: './purchase-dashboard.component.html',
    styleUrls: ['./purchase-dashboard.component.scss'],
})
export class PurchaseDashboardComponent {
    @Input() payment = 0;
    @Input() products: Product[];

    @Output() purchase = new EventEmitter<ProductPurchase>();

    public onProductPurchase(productName: string, payment: number) {
        this.purchase.emit({ productName, payment });
    }
}
