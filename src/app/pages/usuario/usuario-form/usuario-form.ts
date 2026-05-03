import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { userRole } from '../../../shared/enums/enum';
import { MATERIAL_IMPORTS } from '../../../shared/material-impors';
import { UsuarioModel } from '../../../models/usuario.model';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [
    ...MATERIAL_IMPORTS,
    ReactiveFormsModule
  ],
  templateUrl: './usuario-form.html',
  styleUrl: './usuario-form.scss',
})
export class UsuarioForm implements OnInit {
  //injec de formularios reactivos
  private fb = inject(FormBuilder);
  //injec de dialog para modal
  private dialogRef = inject(MatDialogRef<UsuarioForm>);

  //Traemos los datos pasados al dialog
  data = inject(MAT_DIALOG_DATA) as {
    usuario: UsuarioModel | null;
    isModificar: boolean;
  };

  //Variable para guardar los roles
  roles: userRole[] = [];

  //Evaluar condiciones del formulario reactivo
  form = this.fb.group({
    id: [{ value: this.data.usuario?.id || '', disabled: true }],

    userName: [
      this.data.usuario?.email || '',
      this.data.isModificar
        ? [Validators.email]
        : [Validators.required, Validators.email],
    ],

    password: [
      '',
      this.data.isModificar
        ? [Validators.minLength(6)]
        : [Validators.required, Validators.minLength(6)],
    ],

    role: [
      this.data.usuario?.role || '',
      this.data.isModificar
        ? []
        : [Validators.required],
    ],

    estado: [
      this.data.usuario?.estado ?? true,
      this.data.isModificar
        ? []
        : [Validators.required],
    ],
  });

  //Validar si va crear para desavilitar el formulario
  constructor() {
    if (!this.data.isModificar && this.data.usuario) {
      this.form.disable();
    }
  }

  //Traer los valores de lor roles
  ngOnInit(): void {
    this.roles = Object.values(userRole);
  }

  /**
   * Metodo guardar, para nuevo usuario como modificar
   * @returns 
   */
  guardar(): void {
    //Validamos si el formulario esta ivalido
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    //Treamos los valores de la fila
    const raw = this.form.getRawValue();


    //Validamos si va modificar
    if (!this.data.isModificar) {
      const payload = {
        email: raw.userName,
        password: raw.password,
        role: raw.role,
      };

      //Cerramos el dialog y pasamos su resultado
      this.dialogRef.close(payload);
      return;
    }

    //Inicializamos el resultado
    const payload: any = {};

    //Validamos campos para poder devolver un resultado
    if (raw.userName && raw.userName.trim() !== '') {
      payload.email = raw.userName;
    }


    if (raw.password && raw.password.trim() !== '') {
      payload.password = raw.password;
    }

    if (raw.role) {
      payload.role = raw.role;
    }

    if (raw.estado !== null && raw.estado !== undefined) {
      payload.estado = raw.estado;
    }

    this.dialogRef.close(payload);
  }
}