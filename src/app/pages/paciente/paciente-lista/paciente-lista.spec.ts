import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteLista } from './paciente-lista';

describe('PacienteLista', () => {
  let component: PacienteLista;
  let fixture: ComponentFixture<PacienteLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacienteLista],
    }).compileComponents();

    fixture = TestBed.createComponent(PacienteLista);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
