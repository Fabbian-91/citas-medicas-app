import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitaLista } from './cita-lista';

describe('CitaLista', () => {
  let component: CitaLista;
  let fixture: ComponentFixture<CitaLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitaLista],
    }).compileComponents();

    fixture = TestBed.createComponent(CitaLista);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
