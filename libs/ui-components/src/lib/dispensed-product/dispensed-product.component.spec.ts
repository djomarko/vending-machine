import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UiComponentsModule } from '@vending-machine/ui-components';

import { DispensedProductComponent } from './dispensed-product.component';

describe('DispensedProductComponent', () => {
    let component: DispensedProductComponent;
    let fixture: ComponentFixture<DispensedProductComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UiComponentsModule],
            providers: [
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {
                        product: {
                            name: 'can',
                            icon: 'icon',
                        },
                        change: 12.2,
                    },
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DispensedProductComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render the product bought', () => {
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('strong').textContent).toContain(
            '1 X can'
        );
    });

    it('should render the change returned', () => {
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('p').textContent).toContain(
            'Change returned: $12.20'
        );
    });
});
