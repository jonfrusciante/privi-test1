import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimocanvasComponent } from './primocanvas.component';

describe('PrimocanvasComponent', () => {
  let component: PrimocanvasComponent;
  let fixture: ComponentFixture<PrimocanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimocanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimocanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
