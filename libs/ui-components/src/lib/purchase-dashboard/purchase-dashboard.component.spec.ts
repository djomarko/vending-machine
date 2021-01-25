import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { PurchaseDashboardComponent } from './purchase-dashboard.component';

describe('PurchaseDashboardComponent', () => {
    let component: PurchaseDashboardComponent;
    let fixture: ComponentFixture<PurchaseDashboardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [PurchaseDashboardComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PurchaseDashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
