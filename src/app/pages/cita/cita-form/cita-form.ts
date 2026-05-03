import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MATERIAL_IMPORTS } from '../../../shared/material-impors';
import { CitaModel } from '../../../models/cita.model';

@Component({
  selector: 'app-cita-form',
  standalone: true,
  imports: [
    ...MATERIAL_IMPORTS,
    ReactiveFormsModule
  ],
  templateUrl: './cita-form.html',
  styleUrl: './cita-form.scss',
})
export class CitaForm {
  //injecta de formulario reactivo
  private fb = inject(FormBuilder);
  //inject de dialog para notificaciones
  private dialogRef = inject(MatDialogRef<CitaForm>);

  //Traemos los datos enviados para validar si crear o modificar
  data = inject(MAT_DIALOG_DATA) as {
    cita: CitaModel | null;
    isModificar: boolean;
  };

  //Validaciones del formulario
  form = this.fb.group({
    id: [{ value: this.data.cita?.id || '', disabled: true }],

    fecha: [
      this.data.cita?.fecha || '',
      [Validators.required],
    ],

    hora: [
      this.data.cita?.hora || '',
      [Validators.required],
    ],

    motivo: [
      this.data.cita?.motivo || '',
      [Validators.required],
    ],

    observaciones: [
      this.data.cita?.observaciones || '',
    ],

    pacienteId: [
      this.data.cita?.paciente?.id || '',
      [Validators.required],
    ],

    medicoId: [
      this.data.cita?.medico?.id || '',
      [Validators.required],
    ],

    estado: [
      this.data.cita?.estado ?? true,
      [Validators.required],
    ],
  });

  constructor() {
    if (!this.data.isModificar && this.data.cita) {
      this.form.disable();
    }
  }

  /**
   * Metodo para guardar una actulzación o creación
   * @returns 
   */
  guardar(): void {
    //Validamos si el formulario est invalido
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    //traemos los datos de la fila
    const raw = this.form.getRawValue();

    //Generamos un núevo payload
    const payload: any = {};

    //Validamos los datos de cada label del formulario
    if (raw.pacienteId !== null && raw.pacienteId !== undefined && raw.pacienteId !== '') {
      payload.pacienteId = Number(raw.pacienteId);
    }

    if (raw.medicoId !== null && raw.medicoId !== undefined && raw.medicoId !== '') {
      payload.medicoId = Number(raw.medicoId);
    }

    if (raw.fecha && raw.fecha.trim() !== '') {
      payload.fecha = raw.fecha;
    }

    if (raw.hora && raw.hora.trim() !== '') {
      payload.hora = raw.hora.substring(0, 5);
    }

    if (raw.motivo && raw.motivo.trim() !== '') {
      payload.motivo = raw.motivo;
    }

    if (raw.observaciones && raw.observaciones.trim() !== '') {
      payload.observaciones = raw.observaciones;
    }

    if (this.data.isModificar) {
      payload.estado = raw.estado;
    }

    //cerramos el modal y le pasamos el payload como resultado
    this.dialogRef.close(payload);
  }
}