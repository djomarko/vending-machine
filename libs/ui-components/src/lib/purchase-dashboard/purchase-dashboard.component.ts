import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Product, ProductPurchase } from '@vending-machine/models';

@Component({
    selector: 'vm-purchase-dashboard',
    templateUrl: './purchase-dashboard.component.html',
    styleUrls: ['./purchase-dashboard.component.scss'],
})
export class PurchaseDashboardComponent implements OnChanges {
    @Input() products: Product[];

    @Output() purchase = new EventEmitter<ProductPurchase>();

    public missingProducts: number[];
    private readonly MINIMUM_NUM_PRODUCTS = 6;

    ngOnChanges(changes: SimpleChanges) {
        if (changes.products) {
            const missingProducts =
                this.MINIMUM_NUM_PRODUCTS - this.products?.length;
            if (missingProducts > 0) {
                this.missingProducts = Array(missingProducts)
                    .fill(0)
                    .map((x, i) => i);
            }
        }
    }

    public payment: number | null;

    public onProductPurchase(productName: string, payment: number) {
        this.purchase.emit({ productName, payment });
    }

    public resetPayment() {
        this.payment = null;
    }
}
