import { Component, Input, OnInit } from '@angular/core';
import { Product } from '@vending-machine/models';

@Component({
    selector: 'message-display',
    templateUrl: './message-display.component.html',
    styleUrls: ['./message-display.component.scss'],
})
export class MessageDisplayComponent {
    @Input() message: string;
    @Input() products: Pick<Product, 'name'|'quantity'>[];

}
