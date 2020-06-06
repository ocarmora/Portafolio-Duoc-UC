import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderModuleComponent } from './order-module.component';

describe('OrderModuleComponent', () => {
  let component: OrderModuleComponent;
  let fixture: ComponentFixture<OrderModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
