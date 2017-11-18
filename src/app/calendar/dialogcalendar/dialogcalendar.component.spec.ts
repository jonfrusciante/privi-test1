import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogcalendarComponent } from './dialogcalendar.component';

describe('DialogcalendarComponent', () => {
  let component: DialogcalendarComponent;
  let fixture: ComponentFixture<DialogcalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogcalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogcalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
