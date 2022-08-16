import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutProcessingComponent } from './checkout-processing.component';

describe('CheckoutProcessingComponent', () => {
  let component: CheckoutProcessingComponent;
  let fixture: ComponentFixture<CheckoutProcessingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutProcessingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
