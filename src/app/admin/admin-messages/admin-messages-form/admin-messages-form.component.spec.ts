import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMessagesFormComponent } from './admin-messages-form.component';

describe('AdminMessagesFormComponent', () => {
  let component: AdminMessagesFormComponent;
  let fixture: ComponentFixture<AdminMessagesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMessagesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMessagesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
