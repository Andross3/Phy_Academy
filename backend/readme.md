# Phy Academy
# Tecnologias
- **Lenguaje**: Python 3.10+
- pip 21.2+
- **Framework**:flask 3.1.0
- **ORM**: Prisma
- **Gestor de paquetes**: NPM
- **Base de datos**: PostgreSQL

## Requisitos previos

- //Node.js
- NPM (Debe ser instalado desde su página oficial)
- PostgreSQL

## Instalacion
1. Clonar el repositorio
```
git clone https://github.com/Andross3/Phy_Academy.git
cd backend
```
2. Crear un entorno virtual 
```
python -m venv venv
```
3. Activar el entorno virtual
```
venv\Scripts\activate
```
4. Instalar las dependencias
```
pip install -r requirements.txt
```
5. Configura las variables de entorno:
   - Crea un archivo `.env` en la raíz del proyecto
   - Agrega los campos del `.env.example` como base
6. Inicializa Prisma:
   ```bash
   npx prisma init
   ```

7. Crea al menos un modelo en `prisma/schema.prisma`:
   ```prisma
   model Example {
     id Int @id @default(autoincrement())
   }
   ```

8. Genera el cliente de Prisma:
   ```bash
   npm prisma:generate
   ```

9. Crea las migraciones de la base de datos:
   ```bash
   npm prisma:migrate
   ```

## Scripts disponibles

**prisma:generate**: Genera el cliente de Prisma
  ```bash
  npm prisma:generate
  ```

 **prisma:migrate**: Crea y aplica migraciones de la base de datos
  ```bash
  npm prisma:migrate
  ```

 **prisma:studio**: Abre la interfaz de Prisma Studio para visualizar la base de datos
  ```bash
  npm prisma:studio
  ```