import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarHederComponent } from './calendar-heder.component';

describe('CalendarHederComponent', () => {
  let component: CalendarHederComponent;
  let fixture: ComponentFixture<CalendarHederComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarHederComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarHederComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
