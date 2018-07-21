import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEditorierComponent } from './view-editorier.component';

describe('ViewEditorierComponent', () => {
  let component: ViewEditorierComponent;
  let fixture: ComponentFixture<ViewEditorierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEditorierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEditorierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
