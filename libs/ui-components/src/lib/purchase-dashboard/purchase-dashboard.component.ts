import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '@vending-machine/models';

@Component({
    selector: 'vm-user-dashboard',
    templateUrl: './purchase-dashboard.component.html',
    styleUrls: ['./purchase-dashboard.component.scss'],
})
export class PurchaseDashboardComponent {
    @Input() payment: number;
    @Input() products: Product[];

    @Output() purchase = new EventEmitter<{
        product: string;
        payment: number;
    }>();

    public onProductPurchase(product: string, payment: number) {
        this.purchase.emit({ product, payment });
    }
}
