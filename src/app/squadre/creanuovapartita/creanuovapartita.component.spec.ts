import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreanuovapartitaComponent } from './creanuovapartita.component';

describe('CreanuovapartitaComponent', () => {
  let component: CreanuovapartitaComponent;
  let fixture: ComponentFixture<CreanuovapartitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreanuovapartitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreanuovapartitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
