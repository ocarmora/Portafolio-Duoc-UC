import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleModuleComponent } from './sale-module.component';

describe('SaleModuleComponent', () => {
  let component: SaleModuleComponent;
  let fixture: ComponentFixture<SaleModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
