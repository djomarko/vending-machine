import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product, UpdateStock } from '@vending-machine/models';

@Component({
    selector: 'vm-increase-stock',
    templateUrl: './increase-stock.component.html',
    styleUrls: ['./increase-stock.component.scss'],
})
export class IncreaseStockComponent {
    @Input() products: Pick<Product,'name'>[];

    @Output() addProducts = new EventEmitter<UpdateStock>();

    public stockProduct(productName: string, quantity: number) {
        if(isNaN(quantity)){
            return;
        }

        this.addProducts.emit({ productName, quantity });
    }
}
