import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuovapartitaComponent } from './nuovapartita.component';

describe('NuovapartitaComponent', () => {
  let component: NuovapartitaComponent;
  let fixture: ComponentFixture<NuovapartitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuovapartitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuovapartitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
