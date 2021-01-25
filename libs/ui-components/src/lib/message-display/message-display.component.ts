import { Component, Input } from '@angular/core';
import { Product } from '@vending-machine/models';

@Component({
    selector: 'vm-message-display',
    templateUrl: './message-display.component.html',
    styleUrls: ['./message-display.component.scss'],
})
export class MessageDisplayComponent {
    @Input() message: string;
    @Input() products: Pick<Product, 'name'|'quantity'>[];

}
