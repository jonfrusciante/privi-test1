import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RichesteComponent } from './richeste.component';

describe('RichesteComponent', () => {
  let component: RichesteComponent;
  let fixture: ComponentFixture<RichesteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RichesteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RichesteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
