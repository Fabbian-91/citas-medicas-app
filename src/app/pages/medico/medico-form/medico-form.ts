import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MATERIAL_IMPORTS } from '../../../shared/material-impors';
import { MedicoModel } from '../../../models/medico.model';

@Component({
  selector: 'app-medico-form',
  standalone: true,
  imports: [
    ...MATERIAL_IMPORTS,
    ReactiveFormsModule
  ],
  templateUrl: './medico-form.html',
  styleUrl: './medico-form.scss',
})
export class MedicoForm {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<MedicoForm>);

  data = inject(MAT_DIALOG_DATA) as {
    medico: MedicoModel | null;
    isModificar: boolean;
  };

  form = this.fb.group({
    id: [{ value: this.data.medico?.id || '', disabled: true }],

    nombre: [
      this.data.medico?.nombre || '',
      this.data.isModificar ? [] : [Validators.required],
    ],

    especialidad: [
      this.data.medico?.especialidad || '',
      this.data.isModificar ? [] : [Validators.required],
    ],

    estado: [
      this.data.medico?.estado ?? true,
      this.data.isModificar ? [] : [Validators.required],
    ],
  });

  constructor() {
    if (!this.data.isModificar && this.data.medico) {
      this.form.disable();
    }
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();

    if (!this.data.isModificar) {
      const payload = {
        nombre: raw.nombre,
        especialidad: raw.especialidad,
      };

      this.dialogRef.close(payload);
      return;
    }

    const payload: any = {};

    if (raw.nombre && raw.nombre.trim() !== '') {
      payload.nombre = raw.nombre;
    }

    if (raw.especialidad && raw.especialidad.trim() !== '') {
      payload.especialidad = raw.especialidad;
    }

    if (raw.estado !== null && raw.estado !== undefined) {
      payload.estado = raw.estado;
    }

    this.dialogRef.close(payload);
  }
}