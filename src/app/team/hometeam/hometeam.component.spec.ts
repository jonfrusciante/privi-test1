import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HometeamComponent } from './hometeam.component';

describe('HometeamComponent', () => {
  let component: HometeamComponent;
  let fixture: ComponentFixture<HometeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HometeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HometeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
