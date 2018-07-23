import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TickersListComponent } from './products-list.component';

describe('TickersListComponent', () => {
  let component: TickersListComponent;
  let fixture: ComponentFixture<TickersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TickersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TickersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
