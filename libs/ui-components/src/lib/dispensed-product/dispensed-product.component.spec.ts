import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispensedProductComponent } from './dispensed-product.component';

describe('DispensedProductComponent', () => {
  let component: DispensedProductComponent;
  let fixture: ComponentFixture<DispensedProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DispensedProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DispensedProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
