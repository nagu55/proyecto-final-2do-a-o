# 🎬 Gestión de Películas

Sistema CRUD fullstack para gestionar una colección de películas.

---

## Tecnologías utilizadas

- **Backend:** Node.js, Express, Prisma ORM
- **Base de datos:** MySQL
- **Frontend:** HTML, CSS, JavaScript Vanilla

---

## Estructura del proyecto
crud-peliculas/

├── backend/

│   ├── src/

│   │   ├── routes/

│   │   │   └── peliculas.js

│   │   └── index.js

│   ├── prisma/

│   │   ├── schema.prisma

│   │   └── migrations/

│   ├── .env

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
git clone <url-del-repositorio>
cd crud-peliculas
```

### 2. Instalar dependencias del backend

```bash
cd backend
npm install
```

### 3. Configurar la base de datos

Crear un archivo `.env` dentro de la carpeta `backend` con el siguiente contenido:
DATABASE_URL="mysql://root:tu_contraseña@localhost:3306/crud_peliculas"
### 4. Ejecutar las migraciones

```bash
npx prisma migrate dev --name init
```

### 5. Generar el cliente de Prisma

```bash
npx prisma generate
```

---

## Instrucciones de ejecución

### Iniciar el backend

```bash
cd backend
node src/index.js
```

El servidor quedará corriendo en `http://localhost:3000`

### Abrir el frontend

Abrí el archivo `frontend/index.html` directamente en el navegador.

---

## Descripción del sistema

Sistema de gestión de películas que permite realizar operaciones CRUD completas:

- **Listar** todas las películas registradas
- **Agregar** nuevas películas con título, director, año y género
- **Editar** los datos de una película existente
- **Eliminar** películas del sistema

La información se persiste en una base de datos MySQL a través de Prisma ORM.

---

## Endpoints de la API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /peliculas | Obtener todas las películas |
| GET | /peliculas/:id | Obtener una película por ID |
| POST | /peliculas | Crear una nueva película |
| PUT | /peliculas/:id | Editar una película |
| DELETE | /peliculas/:id | Eliminar una película |