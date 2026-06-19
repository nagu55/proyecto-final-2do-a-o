# 🎬 CineApp - Gestión de Películas

Sistema fullstack de gestión de películas con catálogo público, alquiler/compra y panel de administración.

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

│   │   ├── routes/

│   │   │   ├── peliculas.js

│   │   │   ├── auth.js

│   │   │   └── transacciones.js

│   │   ├── middleware.js

│   │   ├── crearAdmin.js

│   │   └── index.js

│   ├── prisma/

│   │   ├── schema.prisma

│   │   └── migrations/

│   └── package.json

├── frontend/

│   ├── index.html

│   ├── style.css

│   └── app.js

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

Esto crea el usuario admin con las siguientes credenciales:
- **Email:** admin@peliculas.com
- **Password:** admin123

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

## Descripción del sistema

CineApp es un sistema de gestión de películas con dos tipos de acceso:

### Vista pública (cualquier usuario)
- Ver el catálogo de películas disponibles
- Alquilar una película ingresando su nombre
- Comprar una película ingresando su nombre

### Panel de administrador (requiere login)
- Agregar nuevas películas
- Editar películas existentes
- Eliminar películas
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