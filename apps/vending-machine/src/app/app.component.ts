import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '@vending-machine/models';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { getAllProducts } from '../../../../libs/engine/src/lib/+state/products.selectors';

@Component({
    selector: 'vending-machine-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {

}
