import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoryCreateComponent } from './product-category-create.component';

describe('ProductCategoryCreateComponent', () => {
  let component: ProductCategoryCreateComponent;
  let fixture: ComponentFixture<ProductCategoryCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCategoryCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCategoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
