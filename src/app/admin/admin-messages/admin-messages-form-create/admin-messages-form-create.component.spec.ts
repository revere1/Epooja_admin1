import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMessagesFormCreateComponent } from './admin-messages-form-create.component';

describe('AdminMessagesFormCreateComponent', () => {
  let component: AdminMessagesFormCreateComponent;
  let fixture: ComponentFixture<AdminMessagesFormCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMessagesFormCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMessagesFormCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
