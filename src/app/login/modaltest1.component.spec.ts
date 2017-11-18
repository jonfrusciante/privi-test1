import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Modaltest1Component } from './modaltest1.component';

describe('Modaltest1Component', () => {
  let component: Modaltest1Component;
  let fixture: ComponentFixture<Modaltest1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Modaltest1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Modaltest1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
