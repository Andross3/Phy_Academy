
Despliegue de Aplicación en Railway


Este proyecto utiliza un enfoque personalizado para desplegar una aplicación fullstack (Frontend con Node.js y Backend con Flask) en Railway mediante Docker.

---

1. Dockerfile

---

El archivo Dockerfile está dividido en tres etapas:

1. ETAPA BACKEND:

   - Imagen base: python:3.11-slim
   - Se instalan las dependencias necesarias para compilar e instalar librerías (gcc, libpq-dev, etc.).
   - Se copian los archivos del backend y se instalan los paquetes definidos en requirements.txt.

2. ETAPA FRONTEND:

   - Imagen base: node:20
   - Se instalan las dependencias de Node.js usando `npm install`.
   - Se compilan los archivos del frontend con `npm run build`.

3. ETAPA FINAL:
   - Imagen base: python:3.11-slim (otra vez para mantener liviano el resultado final).
   - Se copian los artefactos del backend y del frontend ya construidos desde las etapas anteriores.
   - Se establece el puerto `8080` y el `FLASK_APP`.
   - Se expone el puerto para Railway y se arranca el servidor con `gunicorn` y `flask db upgrade`.

---

2. Procfile

---

El comando de inicio ya está definido en la instrucción del Procfile.

---

3. Variables de Entorno en Railway

---

Se deben configurar las siguientes variables de entorno (Environment Variables) en el dashboard de Railway:

- **DATABASE_URL**: la URL proporcionada por Railway al crear la base de datos PostgreSQL. Ejemplo: `postgresql://user:pass@host:port/dbname`
- **FLASK_APP**: Define el punto de entrada de la app Flask. Debe ser: `backend.app.main:app`
- **FLASK_ENV**: Define el entorno. Para desarrollo puede ser `development`, para producción puede ser `production`.
- **PORT**: Railway asigna automáticamente un puerto al contenedor. Es necesario que tu aplicación escuche ese puerto. En este caso ya se está usando el puerto `8080`.

---

4. Estructura del Proyecto

---

El proyecto debe tener la siguiente estructura:

├── Dockerfile
├── backend/
│ ├── app/
│ │ └── main.py
│ ├── requirements.txt
│ ├── migrations/
│ └── alembic.ini
└── frontend/
├── package.json
├── package-lock.json
└── src/

---

5. Despliegue en Railway

---

Pasos:

1. Subir el proyecto a GitHub.
2. Crear un nuevo proyecto en Railway.
3. Elegir la opción "Deploy from GitHub Repo".
4. Railway detectará automáticamente el Dockerfile.
5. Configurar las variables de entorno mencionadas anteriormente.
6. Esperar a que el build y deploy finalicen correctamente.
7. La app estará disponible en el dominio que Railway te proporcione.

---

6. Base de Datos

---

Usas PostgreSQL proporcionado por Railway:

- Agrega el plugin "PostgreSQL".
- Railway generará automáticamente la variable `DATABASE_URL`.
- Flask la utiliza automáticamente cuando la tienes una configuración como:
  ```python
  import os
  app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
  ```
