import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DispenseData } from '@vending-machine/models';


@Component({
    selector: 'vm-dispensed-product',
    templateUrl: './dispensed-product.component.html',
    styleUrls: ['./dispensed-product.component.scss'],
})
export class DispensedProductComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: DispenseData) {}
}
