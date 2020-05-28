import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductModuleComponent } from './product-module.component';

describe('ProductModuleComponent', () => {
  let component: ProductModuleComponent;
  let fixture: ComponentFixture<ProductModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
