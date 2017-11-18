import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserClassComponent } from './user-class.component';

describe('UserClassComponent', () => {
  let component: UserClassComponent;
  let fixture: ComponentFixture<UserClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
