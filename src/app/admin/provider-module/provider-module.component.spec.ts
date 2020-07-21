import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderModuleComponent } from './provider-module.component';

describe('ProviderModuleComponent', () => {
  let component: ProviderModuleComponent;
  let fixture: ComponentFixture<ProviderModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
