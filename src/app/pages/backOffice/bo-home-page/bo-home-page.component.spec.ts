import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoHomePageComponent } from './bo-home-page.component';

describe('BoHomePageComponent', () => {
  let component: BoHomePageComponent;
  let fixture: ComponentFixture<BoHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoHomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
