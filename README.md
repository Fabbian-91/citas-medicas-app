# 🏥 Sistema de Citas Médicas

<p align="center">
  <img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeORM-E83524?style=for-the-badge" />
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-Seguridad-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
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

### Contenedores

- Docker
- Docker Compose
- Imagen oficial de MySQL
- Dockerfile para frontend
- Dockerfile para backend
- Volúmenes para persistencia de datos

---

## 🧱 Arquitectura del proyecto

El proyecto está dividido en tres partes principales:

```txt
Frontend Angular  →  Backend Express/TypeORM  →  Base de datos MySQL
```

Esta separación facilita el mantenimiento, la escalabilidad y la comprensión del código durante la defensa del proyecto.

---

## 🧠 Explicación técnica breve

El frontend desarrollado en **Angular** se encarga de la interacción con el usuario, formularios, validaciones visuales, navegación y consumo de servicios HTTP.

El backend desarrollado con **Express.js** expone una API REST encargada de procesar las solicitudes, validar datos, aplicar seguridad, controlar permisos por roles y comunicarse con la base de datos mediante **TypeORM**.

La base de datos **MySQL** almacena la información de usuarios, pacientes, médicos y citas, manteniendo relaciones entre entidades mediante llaves primarias y foráneas.

**Docker** permite ejecutar cada parte del sistema en contenedores separados, facilitando la configuración del entorno y evitando instalaciones manuales adicionales.

---

## 📁 Estructura general del proyecto

```txt
citas-medicas-app-frontend/
│
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── .env.example
├── package.json
├── angular.json
├── src/
│
└── citas-medicas-app-backend/
    ├── Dockerfile
    ├── .dockerignore
    ├── .env.example
    ├── package.json
    └── src/
```

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

## 🐳 Uso con Docker

El proyecto también puede ejecutarse utilizando **Docker** y **Docker Compose**, permitiendo levantar de forma automática el frontend, backend y la base de datos MySQL en contenedores separados.

### 📦 Servicios incluidos

El archivo `docker-compose.yml` levanta los siguientes servicios:

```txt
frontend  → Aplicación Angular
backend   → API REST con Express y TypeORM
mysql     → Base de datos MySQL
```

La comunicación entre servicios se realiza mediante la red interna creada automáticamente por Docker Compose.

```txt
Frontend → Backend → MySQL
```

---

## ⚙️ Variables de entorno

Antes de levantar el proyecto con Docker Compose, se debe crear un archivo `.env` en la raíz del proyecto tomando como referencia el archivo `.env.example`.

Ejemplo de variables necesarias:

```env
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=sistema_citas_medicas
MYSQL_USER=fabian
MYSQL_PASSWORD=1234

PORT=3000
DB_HOST=mysql
DB_PORT=3306
DB_USERNAME=fabian
DB_PASSWORD=1234
DB_DATABASE=sistema_citas_medicas
```

> **Nota:** El archivo `.env` no debe subirse a GitHub. Para compartir la configuración se utiliza `.env.example`.

---

## 🐬 Base de datos con Docker

El servicio de MySQL se ejecuta en un contenedor utilizando la imagen oficial:

```txt
mysql:8
```

La base de datos se crea automáticamente al iniciar el contenedor, usando las variables definidas en el archivo `.env`.

El contenedor de MySQL utiliza un volumen para mantener los datos guardados:

```txt
citas_mysql_data
```

Esto permite conservar la información aunque el contenedor sea detenido o reiniciado.

Desde la computadora local, MySQL queda disponible en:

```txt
localhost:3307
```

Dentro de Docker Compose, el backend se conecta a MySQL usando:

```txt
mysql:3306
```

Por eso, dentro del contenedor del backend no se utiliza `localhost` para conectarse a la base de datos, sino el nombre del servicio `mysql`.

---

## 🚀 Ejecutar el proyecto con Docker Compose

Desde la raíz del proyecto, ejecutar:

```bash
docker compose up --build
```

Este comando construye las imágenes necesarias y levanta los contenedores del frontend, backend y MySQL.

Para ejecutar los contenedores en segundo plano:

```bash
docker compose up -d --build
```

---

## 🌐 Acceso a la aplicación

Una vez levantados los contenedores, la aplicación estará disponible en:

```txt
Frontend: http://localhost:4200
Backend:  http://localhost:3000
MySQL:    localhost:3307
```

---

## 📋 Verificar contenedores activos

Para revisar los servicios levantados:

```bash
docker compose ps
```

También se pueden ver los contenedores desde Docker Desktop.

---

## 📄 Ver logs

Ver logs de todos los servicios:

```bash
docker compose logs
```

Ver logs del backend:

```bash
docker compose logs backend
```

Ver logs del frontend:

```bash
docker compose logs frontend
```

Ver logs de MySQL:

```bash
docker compose logs mysql
```

También se pueden revisar los logs usando el nombre del contenedor:

```bash
docker logs citas_backend
docker logs citas_frontend
docker logs citas_mysql
```

---

## 🔄 Reiniciar servicios

Reiniciar el backend:

```bash
docker compose restart backend
```

Reiniciar el frontend:

```bash
docker compose restart frontend
```

Reiniciar MySQL:

```bash
docker compose restart mysql
```

---

## 🛑 Detener los contenedores

Para detener los servicios:

```bash
docker compose down
```

Para detener los servicios y eliminar también el volumen de MySQL:

```bash
docker compose down -v
```

> **Precaución:** `docker compose down -v` elimina los datos guardados en la base de datos del contenedor.

---

## 🧱 Imágenes Docker

El proyecto utiliza imágenes propias para frontend y backend, además de la imagen oficial de MySQL.

```txt
frontend → imagen construida desde Dockerfile
backend  → imagen construida desde citas-medicas-app-backend/Dockerfile
mysql    → imagen oficial mysql:8
```

También se pueden subir las imágenes propias a Docker Hub para compartirlas o ejecutarlas en otro equipo.

Ejemplo de imágenes usadas durante las pruebas:

```txt
fabi2006/citas-front:latest
fabi2006/citas-backend:latest
```

---

## 🧪 Comandos Docker útiles

Construir manualmente la imagen del backend:

```bash
cd citas-medicas-app-backend
docker build -t mi-back .
```

Construir manualmente la imagen del frontend:

```bash
docker build -t mi-front .
```

Ver imágenes locales:

```bash
docker images
```

Ver contenedores activos:

```bash
docker ps
```

Ver todos los contenedores, incluyendo detenidos:

```bash
docker ps -a
```

Entrar a un contenedor:

```bash
docker exec -it citas_backend sh
```

O si el contenedor tiene bash:

```bash
docker exec -it citas_backend bash
```

---

## ✅ Ventajas de usar Docker en este proyecto

- Permite ejecutar frontend, backend y base de datos con un solo comando.
- Evita instalar MySQL manualmente en el equipo.
- Asegura que todos los servicios usen la misma configuración.
- Facilita mover el proyecto a otra computadora.
- Separa cada parte del sistema en un contenedor independiente.
- Permite revisar logs, reiniciar servicios y limpiar recursos fácilmente.
- Permite trabajar con una base de datos aislada del MySQL local del equipo.
- Facilita la defensa técnica del proyecto mostrando una arquitectura por servicios.

---

## 🧩 Archivos importantes para Docker

```txt
Dockerfile                          → Dockerfile del frontend
docker-compose.yml                  → Configuración de Docker Compose
.dockerignore                       → Archivos ignorados al construir la imagen frontend
.env.example                        → Ejemplo de variables de entorno

citas-medicas-app-backend/Dockerfile     → Dockerfile del backend
citas-medicas-app-backend/.dockerignore  → Archivos ignorados al construir la imagen backend
citas-medicas-app-backend/.env.example   → Ejemplo de variables de entorno del backend
```

---

## 🔐 Seguridad de variables de entorno

El archivo `.env` contiene información sensible como usuarios, contraseñas y nombre de base de datos.

Por seguridad:

- ✅ Se sube `.env.example`.
- ❌ No se sube `.env`.

El archivo `.gitignore` debe incluir:

```gitignore
.env
.env.*
!.env.example
```

De esta manera, el proyecto puede compartirse sin exponer credenciales reales.

---

## 📌 Estado del proyecto

- ✅ Proyecto funcional
- ✅ Frontend implementado
- ✅ Backend implementado
- ✅ Base de datos MySQL
- ✅ Autenticación JWT
- ✅ Control de roles
- ✅ CRUD completo
- ✅ Validación de citas duplicadas
- ✅ Dockerfile frontend
- ✅ Dockerfile backend
- ✅ Docker Compose configurado
- ✅ MySQL en contenedor
- ✅ Volumen para persistencia de datos

---

## 📄 Licencia

Este proyecto fue desarrollado con fines educativos para la actividad de comprobación del curso de **Codificación de páginas web para desarrollo de aplicaciones de software**, en el **INA**.

---

## 👨‍💻 Autor

Proyecto desarrollado por **Anthony Fabian Mora Herrera**.
