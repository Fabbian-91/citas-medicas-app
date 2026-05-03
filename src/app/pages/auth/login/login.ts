import { Component, inject } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../../shared/material-impors';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '../../../service/auth';
import { LoginModel } from '../../../models/login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [...MATERIAL_IMPORTS, ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  //Injectamos los furmularios reactivos
  private fb = inject(FormBuilder);

  //Injectamos el servicio de autenticación
  private authService = inject(Auth);

  //Injectamos routes
  private router = inject(Router);

  //Creamos el formulario reactivo
  login = this.fb.group({
    //Validamos los campos de requerdo y correo electrónico
    email: ['', [Validators.required, Validators.email]],
    //Validamos el campo de contraseña con requerdo y longitud mínima de 6 caracteres
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  autentificar(): void {
    //validar si el login es valido
    if (this.login.invalid) {
      //mostrar warning
      console.warn('Formulario inválido');
      //Limpiar campos
      this.login.markAllAsTouched();
      return
    }

    //obtenemos los datos del formulario
    const datos = this.login.getRawValue() as unknown as LoginModel;

    //Llamamos al servicio de autenticación
    this.authService.login(datos).subscribe({
      next: (res) => {
        //obtenemos el boyd
        const body = res.body;

        //Validamos el body
        if (!body) {
          //Mostrar error
          console.error("No se recibio el body de repuesta");
          return;
        }

        //Obtenemos el token
        const token =
          res.headers.get('token') ||
          res.headers.get('Authorization') ||
          res.headers.get('authorization') ||
          body.token;

        console.log('Token recibido:', token);
        console.log('Body recibido:', body);

        // Validamos que sí exista token
        // Si no hay token, el guard no va a dejar entrar al dashboard
        if (!token) {
          console.error('No se recibió token');
          return;
        }

        // Guardamos la sesión en el servicio
        this.authService.saveSession(body, token);

        // Redireccionamos al dashboard
        // replaceUrl evita que el usuario vuelva al login con el botón atrás
        this.router.navigate(['/dashboard'], { replaceUrl: true });
      },
      error: (error) => {
        console.error('Error completo:', error);
        console.error('Status:', error.status);
        console.error('Body del error:', error.error);
        console.error('Mensaje:', error.error?.message);
        console.error('Errores:', JSON.stringify(error.error?.errors, null, 2));
      }
    });
  }
}


