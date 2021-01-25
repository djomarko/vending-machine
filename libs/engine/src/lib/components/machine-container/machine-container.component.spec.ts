import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineContainerComponent } from './machine-container.component';

describe('MachineContainerComponent', () => {
  let component: MachineContainerComponent;
  let fixture: ComponentFixture<MachineContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachineContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
