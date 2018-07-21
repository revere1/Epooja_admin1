import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalystsListComponent } from './analysts-list.component';

describe('AnalystsListComponent', () => {
  let component: AnalystsListComponent;
  let fixture: ComponentFixture<AnalystsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalystsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalystsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
