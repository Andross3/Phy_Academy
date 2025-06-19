FROM python:3.11-slim AS backend

WORKDIR /app

# Instala herramientas necesarias para compilar dependencias
RUN apt-get update && apt-get install -y \
    build-essential \
    gcc \
    libffi-dev \
    libssl-dev \
    python3-dev \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY backend/requirements.txt .
RUN python -m pip install --upgrade pip
RUN python -m pip install --no-cache-dir -r requirements.txt

COPY backend /app/backend
COPY backend/migrations /app/migrations
COPY backend/alembic.ini /app/alembic.ini

FROM node:20 AS frontend

WORKDIR /app

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ ./
RUN npm run build

FROM python:3.11-slim

WORKDIR /app

ENV PORT=8090
EXPOSE 8090

COPY --from=backend /usr/local/lib/python3.11 /usr/local/lib/python3.11
COPY --from=backend /usr/local/bin /usr/local/bin

COPY --from=backend /app/backend ./backend
COPY --from=backend /app/migrations ./migrations
COPY --from=backend /app/alembic.ini ./alembic.ini

COPY --from=frontend /app/dist ./frontend/dist

ENV FLASK_APP=backend.app.main:app

CMD ["sh", "-c", "flask db upgrade && gunicorn --bind 0.0.0.0:$PORT backend.app.main:app"]
