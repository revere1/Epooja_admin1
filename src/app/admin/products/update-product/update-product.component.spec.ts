import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTickerComponent } from './update-product.component';

describe('UpdateTickerComponent', () => {
  let component: UpdateTickerComponent;
  let fixture: ComponentFixture<UpdateTickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});