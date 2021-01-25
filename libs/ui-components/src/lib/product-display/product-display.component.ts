import { Component, Input } from '@angular/core';

@Component({
  selector: 'vm-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.scss']
})
export class ProductDisplayComponent {
  @Input() noise = false;
}
