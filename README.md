# MiniBlog - DevSpark 
(Proyecto Integrador | Módulo 2)

## Descripción del Proyecto

API REST para un blog que permite gestionar autores, publicaciones (posts) y comentarios (comments). Construida con Node.js, Express y PostgreSQL. Incluye validaciones, manejo de errores, pruebas unitarias e integración, y documentación completa con OpenAPI/Swagger.

### Entidades
- **Authors**: id, name, email, bio, created_at
- **Posts**: id, author_id (FK → authors.id), title, content, published, created_at
- **Comments**: id, post_id (FK → posts.id), author_id (FK → authors.id), content, created_at

### Endpoints REST
- **Authors**: GET /api/authors, GET /api/authors/:id, POST /api/authors, PUT /api/authors/:id, DELETE /api/authors/:id
- **Posts**: GET /api/posts, GET /api/posts/:id, GET /api/posts/author/:authorId, POST /api/posts, PUT /api/posts/:id, DELETE /api/posts/:id
- **Comments**: GET /api/comments, GET /api/comments/:id, POST /api/comments, PUT /api/comments/:id, DELETE /api/comments/:id

## Requisitos

- Node.js (versión 18 o superior)
- PostgreSQL
- npm

## Pasos para Ejecutar Local

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/FacundoRozalez/ProyectoM2_FacundoRozalez
   cd ProyectoM2_FacundoRozalez
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Configura el entorno**:
   - Copia `.env.example` a `.env` y configura las variables de entorno con tus credenciales de PostgreSQL.
     ```bash
     cp .env.example .env
     ```
     Edita `.env` con valores reales (ejemplo en `.env.example`).

4. **Configura la base de datos**:
   - Crea una base de datos PostgreSQL.
   - Ejecuta los scripts SQL:
     ```bash
     psql -U <tu-usuario> -d <tu-base-de-datos> -f sql/setup.sql
     psql -U <tu-usuario> -d <tu-base-de-datos> -f sql/seed.sql
     ```

5. **Ejecuta la aplicación**:
   - Desarrollo: `npm run dev`
   - Producción: `npm start`
   - El servidor correrá en `http://localhost:3000` (o el puerto en `.env`).

## Cómo Ejecutar Tests

Ejecuta las pruebas unitarias e integración:
```bash
npm test
```

Para modo watch (pruebas automáticas al cambiar código):
```bash
npm run test:watch
```

Los tests incluyen cobertura, generada en `coverage/`.

## Cómo Ejecutar la Documentación OpenAPI

La documentación de la API está disponible via Swagger UI en `http://localhost:3000/openapi` cuando el servidor local está corriendo.

El archivo OpenAPI se encuentra en `swagger/openapi.yaml`.

## Breve Guía de Deployment en Railway


1. **Crea una cuenta en Railway** y conecta tu repositorio de GitHub.

2. **Agrega un servicio PostgreSQL**:
   - En el dashboard de Railway, agrega un plugin de PostgreSQL.
   - Copia las credenciales proporcionadas (internal URL, etc.).
    
    **Nota:** Una vez creado el servicio de PostgreSQL en Railway, recuerda ejecutar los scripts de `sql/setup.sql` y `sql/seed.sql` utilizando la **URL de conexión pública** o el editor de datos de Railway para poblar la base de datos.

3. **Configura variables de entorno**:
   - En la configuración del servicio, agrega las variables de `.env.example`:
     - DBUSER, DBHOST, DBDATABASE, DBPASSWORD, DBPORT (usa la internal URL de PostgreSQL para DBHOST).
     - PORT=3000 (o el asignado por Railway).
     - Tip: En Railway es mejor usar referencias como ${{Postgres.PGHOST}} para aprovechar la red interna gratuita.

4. **Deploy**:
   - Railway detectará el `package.json` y desplegará automáticamente.
   - Una vez desplegado, obtén la **public URL** para acceder a la API.
   - La **internal URL** es para conexiones internas (como la DB).

5. **Accede**:
   - API: https://proyectom2facundorozalez-production.up.railway.app/
   - Docs: https://proyectom2facundorozalez-production.up.railway.app/openapi/api

## Registro del Uso de AI en el Proyecto

En este proyecto se utilizaron herramientas de IA como soporte complementario para optimizar tiempos de desarrollo y validar estándares de calidad:

**ChatGPT (Consultoría Técnica):**
- **Validación de Arquitectura:** Se utilizó para contrastar la estructura de carpetas y asegurar que el patrón Controller-Service-Route cumpliera con las mejores prácticas.
- **Refactorización y QA:** Asistencia en la identificación de edge cases para las pruebas unitarias y sugerencias para optimizar las validaciones de datos.
- **Soporte en Documentación y Deploy:** Consultas puntuales sobre la sintaxis de OpenAPI (Swagger) y resolución de errores específicos durante la configuración en Railway.

**GitHub Copilot (Asistente de Escritura):**
- **Documentación:** Utilizado exclusivamente como apoyo en la redacción de este README.md 

## Tecnologías Utilizadas

- **Node.js** con módulos ES
- **Express.js** para el servidor web
- **PostgreSQL** como base de datos
- **Swagger UI** para documentación de API
- **Vitest** para pruebas
- **Supertest** para pruebas de integración

## Estructura del Proyecto

```
my-blog-project/
├── .env.example             # Variables de entorno de ejemplo
├── .gitignore               # Ignora node_modules y .env
├── package.json
├── package-lock.json
├── README.md
├── sql/
│   ├── setup.sql            # CREATE TABLE + constraints
│   └── seed.sql             # INSERT de prueba
├── src/
│   ├── app.js               # Configuración de Express y middlewares
│   ├── server.js            # Arranca el servidor
│   ├── config.js            # Pool de PostgreSQL usando .env
│   ├── routes/
│   │   ├── authors.route.js
│   │   ├── posts.route.js
│   │   └── comments.route.js
│   ├── controllers/
│   │   ├── authors.controller.js
│   │   ├── posts.controller.js
│   │   └── comments.controller.js
│   └── services/
│       ├── authors.service.js
│       ├── posts.service.js
│       └── comments.service.js
├── test/
│   ├── unit/
│   │   ├── authors.service.test.js
│   │   ├── posts.service.test.js
│   │   └── comments.service.test.js
│   └── integration/
│       ├── authors.route.test.js
│       ├── posts.route.test.js
│       └── comments.route.test.js
└── swagger/
    └── openapi.yaml         # Documentación de la API
```

## Autor

Facundo Rozalez 
Cohorte: WEB-FT72