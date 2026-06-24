# 🎬 CineApp - Gestión de Películas

Sistema fullstack de gestión de películas con catálogo público, alquiler/compra y panel de administración protegido con autenticación.

---

## Alcance del proyecto

Este repositorio combina dos sprints:

- **Sprint 1:** CRUD básico de películas (crear, ver, editar, eliminar) con frontend y backend conectados.
- **Sprint 2:** Sistema de roles — login de administrador con JWT, catálogo público para usuarios, y registro de alquileres/compras.

---

## Tecnologías utilizadas

- **Backend:** Node.js, Express, Prisma ORM
- **Base de datos:** MySQL
- **Frontend:** HTML, CSS, JavaScript Vanilla
- **Autenticación:** JWT (jsonwebtoken) + bcryptjs

---

## Estructura del proyecto
crud-peliculas/

├── backend/

│   ├── src/

│   │   ├── auth/

│   │   │   ├── firmarToken.js       # genera el JWT

│   │   │   └── verificarToken.js    # middleware que valida el JWT

│   │   ├── controllers/

│   │   │   ├── authController.js

│   │   │   ├── peliculasController.js

│   │   │   └── transaccionesController.js

│   │   ├── middlewares/

│   │   │   └── validaciones.js      # validación de datos de entrada

│   │   ├── routes/

│   │   │   ├── auth.js

│   │   │   ├── peliculas.js

│   │   │   └── transacciones.js

│   │   ├── crearAdmin.js

│   │   ├── db.js                    # conexión única a Prisma

│   │   └── index.js

│   ├── prisma/

│   │   ├── schema.prisma

│   │   └── migrations/

│   └── package.json

├── frontend/

│   ├── api/

│   │   ├── peliculasApi.js          # fetch al backend

│   │   ├── authApi.js

│   │   └── transaccionesApi.js

│   ├── ui/

│   │   ├── catalogoUI.js            # manipulación del DOM

│   │   ├── adminUI.js

│   │   └── modalesUI.js

│   ├── utils/

│   │   └── storage.js               # manejo del token en localStorage

│   ├── main.js                      # conecta api + ui + eventos

│   ├── index.html

│   └── style.css

└── README.md
---

## Instrucciones de instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/nagu55/proyecto-final-2do-a-o.git
cd proyecto-final-2do-a-o
```

### 2. Instalar las dependencias del backend

```bash
cd backend
npm install
```

### 3. Configurar la base de datos

Crear un archivo `.env` dentro de la carpeta `backend` con el siguiente contenido (reemplazar con tu propia contraseña de MySQL):
DATABASE_URL="mysql://root:TU_CONTRASEÑA@localhost:3306/crud_peliculas"
### 4. Crear las tablas en la base de datos

```bash
npx prisma migrate dev
```

### 5. Generar el cliente de Prisma

```bash
npx prisma generate
```

### 6. Crear el usuario administrador

```bash
node src/crearAdmin.js
```

---

## Instrucciones de ejecución

### Iniciar el backend

```bash
cd backend
node src/index.js
```

El servidor queda corriendo en `http://localhost:3000`

### Abrir el frontend

Abrir el archivo `frontend/index.html` directamente en el navegador (doble click desde el explorador de Windows).

---

## Credenciales de prueba

Para acceder al panel de administrador, usar:

- **Email:** admin@peliculas.com
- **Password:** admin123

---

## Descripción del sistema

CineApp es un sistema de gestión de películas con dos tipos de acceso:

### Vista pública (cualquier usuario, sin necesidad de login)
- Ver el catálogo de películas disponibles
- Alquilar una película ingresando su nombre
- Comprar una película ingresando su nombre

### Panel de administrador (requiere login)
- Agregar nuevas películas
- Editar películas existentes
- Eliminar películas (no permite eliminar una película con alquileres/compras asociadas, para no perder el historial)
- Ver el historial completo de alquileres y compras

---

## Endpoints de la API

| Método | Endpoint | Acceso | Descripción |
|--------|----------|--------|-------------|
| GET | /catalogo | Público | Ver todas las películas |
| POST | /auth/login | Público | Login del administrador |
| GET | /peliculas | Admin | Ver todas las películas (gestión) |
| GET | /peliculas/:id | Admin | Ver una película por ID |
| POST | /peliculas | Admin | Crear una película |
| PUT | /peliculas/:id | Admin | Editar una película |
| DELETE | /peliculas/:id | Admin | Eliminar una película |
| POST | /transacciones | Público | Registrar alquiler o compra |
| GET | /transacciones | Admin | Ver historial de transacciones |

Las rutas marcadas como **Admin** requieren enviar el token JWT en el header `Authorization: Bearer <token>`.

---

## Notas técnicas

- **Separación de responsabilidades (backend):** las rutas (`routes/`) solo definen los endpoints; la lógica de negocio vive en los controladores (`controllers/`); la conexión a la base de datos está centralizada en un único archivo (`db.js`); la generación y validación de tokens vive en `auth/`; y las validaciones de datos de entrada son middlewares independientes (`middlewares/`).
- **Separación de responsabilidades (frontend):** las llamadas a la API están aisladas en `api/`; la manipulación del DOM vive en `ui/`; y `main.js` conecta ambas capas respondiendo a los eventos del usuario.
- **Integridad de datos:** no se puede eliminar una película que ya tiene transacciones (alquileres/compras) registradas, para preservar el historial.