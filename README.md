# 🏥 Sistema de Citas Médicas

<p align="center">
  <img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeORM-E83524?style=for-the-badge" />
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-Seguridad-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
  <img src="https://img.shields.io/badge/Estado-Funcional-success?style=for-the-badge" />
</p>

---

## 📌 Descripción del proyecto

**Sistema de Citas Médicas** es una aplicación web full stack desarrollada para la gestión de pacientes, médicos y citas médicas dentro de un entorno clínico.

El sistema permite registrar pacientes, administrar médicos, crear citas y validar que no existan citas duplicadas en el mismo horario. Además, implementa autenticación mediante **JWT**, control de acceso por **roles**, validaciones de datos y una arquitectura separada entre frontend, backend y base de datos.

Este proyecto corresponde al **Caso 3: Sistema de Citas Médicas**.

---

## 🎯 Objetivo del sistema

Desarrollar una aplicación web completa que permita la gestión eficiente de citas médicas, aplicando buenas prácticas de desarrollo, seguridad, validación de datos, arquitectura modular y separación de responsabilidades entre frontend, backend y base de datos.

---

## ✨ Funcionalidades principales

### 👤 Autenticación y seguridad

- Inicio de sesión con credenciales.
- Generación de token JWT.
- Protección de rutas privadas.
- Control de acceso según rol.
- Middleware de autenticación en backend.
- Middleware de autorización por roles.
- Interceptor JWT en Angular.
- Guards para proteger vistas del frontend.

### 🧑‍⚕️ Gestión de médicos

- Registrar médicos.
- Listar médicos disponibles.
- Editar información de médicos.
- Eliminar médicos.
- Gestión disponible principalmente para el rol **admin**.

### 🧍 Gestión de pacientes

- Registrar pacientes.
- Consultar pacientes registrados.
- Actualizar información del paciente.
- Eliminar pacientes.
- Gestión disponible para usuarios autorizados.

### 📅 Gestión de citas médicas

- Crear citas médicas.
- Consultar citas registradas.
- Editar información de una cita.
- Cancelar o eliminar citas.
- Validar que un médico no tenga dos citas en el mismo horario.
- Gestión disponible principalmente para el rol **recepcionista**.

---

## 🛠️ Tecnologías utilizadas

### Frontend

- Angular
- Angular Router
- TypeScript
- SCSS
- Formularios reactivos
- Guards
- Interceptor JWT
- RxJS
- Angular Material
- ngx-toastr

### Backend

- Node.js
- Express.js
- TypeScript
- TypeORM
- MySQL
- JWT
- bcrypt / bcryptjs
- class-validator
- class-transformer
- dotenv
- cors
- helmet

### Base de datos

- MySQL
- Llaves primarias
- Llaves foráneas
- Relaciones entre entidades
- Integridad referencial
- Datos iniciales para usuarios y roles

---

Esta separación facilita el mantenimiento, la escalabilidad y la comprensión del código durante la defensa del proyecto.

---

## 🧠 Explicación técnica breve

El frontend desarrollado en Angular se encarga de la interacción con el usuario, formularios, validaciones visuales, navegación y consumo de servicios HTTP.

El backend desarrollado con Express.js expone una API REST encargada de procesar las solicitudes, validar datos, aplicar seguridad, controlar permisos por roles y comunicarse con la base de datos mediante TypeORM.

La base de datos MySQL almacena la información de usuarios, pacientes, médicos y citas, manteniendo relaciones entre entidades mediante llaves primarias y foráneas.

---

## 🖥️ Comandos disponibles

### Frontend

Ejecutar la aplicación Angular en modo desarrollo:

```bash
npm run frontend
```

Compilar el proyecto Angular para producción:

```bash
npm run build
```

Ejecutar pruebas del frontend:

```bash
npm run test
```

### Backend

Ejecutar el backend desde la raíz del proyecto:

```bash
npm run backend
```

Ejecutar el backend en modo desarrollo desde la carpeta del backend:

```bash
cd citas-medicas-app-backend
npm run dev
```

Compilar el backend TypeScript:

```bash
npm run build
```

Ejecutar el backend compilado:

```bash
npm start
```

---

## 📌 Estado del proyecto

```txt
✅ Proyecto funcional
✅ Frontend implementado
✅ Backend implementado
✅ Base de datos MySQL
✅ Autenticación JWT
✅ Control de roles
✅ CRUD completo
✅ Validación de citas duplicadas
```

---

## 📄 Licencia

Este proyecto fue desarrollado con fines educativos para la actividad de comprobación del curso de Codificación de páginas web para desarrollo de aplicaciones de software, en el INA.

---