import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MATERIAL_IMPORTS } from '../../../shared/material-impors';
import { PacienteModel } from '../../../models/paciente.model';

@Component({
  selector: 'app-paciente-form',
  standalone: true,
  imports: [
    ...MATERIAL_IMPORTS,
    ReactiveFormsModule
  ],
  templateUrl: './paciente-form.html',
  styleUrl: './paciente-form.scss',
})
export class PacienteForm {
  //inject de formualario reactivo
  private fb = inject(FormBuilder);
  //inject de modal
  private dialogRef = inject(MatDialogRef<PacienteForm>);

  //Datos para definir el formulario del modal
  data = inject(MAT_DIALOG_DATA) as {
    paciente: PacienteModel | null;
    isModificar: boolean;
  };

  //Validaciones del formulario
  form = this.fb.group({
    id: [{ value: this.data.paciente?.id || '', disabled: true }],

    nombre: [
      this.data.paciente?.nombre || '',
      this.data.isModificar ? [] : [Validators.required],
    ],

    cedula: [
      this.data.paciente?.cedula || '',
      this.data.isModificar ? [] : [Validators.required],
    ],

    telefono: [
      this.data.paciente?.telefono || '',
      this.data.isModificar ? [] : [Validators.required],
    ],

    estado: [
      this.data.paciente?.estado ?? true,
      this.data.isModificar ? [] : [Validators.required],
    ],
  });

  constructor() {
    //Validar si se aplicar las validaciones al formulario reativo
    if (!this.data.isModificar && this.data.paciente) {
      this.form.disable();
    }
  }

  /**
   * Metodo para guardar los datos del formulario
   * @returns 
   */
  guardar(): void {
    //Validamos si el formulario en invalido
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    //Traemos los datos de la fila
    const raw = this.form.getRawValue();

    //Validamos si es modificar
    if (!this.data.isModificar) {
      const payload = {
        nombre: raw.nombre,
        cedula: raw.cedula,
        telefono: raw.telefono,
      };

      this.dialogRef.close(payload);
      return;
    }

    //Generamos un núevo payload
    const payload: any = {};
    
    //validamos cada campo y se lo pasamos al payload
    if (raw.nombre && raw.nombre.trim() !== '') {
      payload.nombre = raw.nombre;
    }

    if (raw.cedula && raw.cedula.trim() !== '') {
      payload.cedula = raw.cedula;
    }

    if (raw.telefono && raw.telefono.trim() !== '') {
      payload.telefono = raw.telefono;
    }

    if (raw.estado !== null && raw.estado !== undefined) {
      payload.estado = raw.estado;
    }
    //Cerramos y le pasamos el resultado
    this.dialogRef.close(payload);
  }
}