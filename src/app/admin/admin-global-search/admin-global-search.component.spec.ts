import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGlobalSearchComponent } from './admin-global-search.component';

describe('AdminGlobalSearchComponent', () => {
  let component: AdminGlobalSearchComponent;
  let fixture: ComponentFixture<AdminGlobalSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGlobalSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGlobalSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
