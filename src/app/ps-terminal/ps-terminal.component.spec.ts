import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsTerminalComponent } from './ps-terminal.component';

describe('PsTerminalComponent', () => {
  let component: PsTerminalComponent;
  let fixture: ComponentFixture<PsTerminalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsTerminalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
