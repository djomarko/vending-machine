import { InjectionToken } from '@angular/core';
import { Product } from '@vending-machine/models';

export const INITIAL_STOCK = new InjectionToken<Product[]>('initial stock');
