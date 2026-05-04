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
  //Inject de formularios reavitos
  private fb = inject(FormBuilder);
  //Inject de el modal
  private dialogRef = inject(MatDialogRef<MedicoForm>);

  //Cargamos los datos para saber que tipos validaciones y datos se le colocan al formulario
  data = inject(MAT_DIALOG_DATA) as {
    medico: MedicoModel | null;
    isModificar: boolean;
  };

  //Validaciones del formulario reactivo
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
    //habilitar la validaciones si no es modificar
    if (!this.data.isModificar && this.data.medico) {
      this.form.disable();
    }
  }

  /**
   * Metodo guardar el formulario
   * @returns 
   */
  guardar(): void {
    //Validamos que el formulario no este invalido
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    //Traemos todos los datos de la fila
    const raw = this.form.getRawValue();

    //Validar si es modificar
    if (!this.data.isModificar) {
      const payload = {
        //Colocar los datos de la fila extraiida
        nombre: raw.nombre,
        especialidad: raw.especialidad,
      };

      //Cerrar y devolver el resultado
      this.dialogRef.close(payload);
      return;
    }

    //Negeramos un payload núevo
    const payload: any = {};

    //validaos y colocamos datos en el payload
    if (raw.nombre && raw.nombre.trim() !== '') {
      payload.nombre = raw.nombre;
    }

    if (raw.especialidad && raw.especialidad.trim() !== '') {
      payload.especialidad = raw.especialidad;
    }

    if (raw.estado !== null && raw.estado !== undefined) {
      payload.estado = raw.estado;
    }
    //cerramos y le pasamos su resultado
    this.dialogRef.close(payload);
  }
}