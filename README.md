# Inventory Management API

API REST desarrollada con Node.js, Express y MongoDB para la gestión de productos de inventario.

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- Dotenv

## Funcionalidades

- Crear productos
- Obtener todos los productos
- Obtener producto por ID
- Actualizar productos
- Eliminar productos

## Endpoints

POST /api/products  
GET /api/products  
GET /api/products/:id  
PUT /api/products/:id  
DELETE /api/products/:id  

## Instalación

1. Clonar el repositorio
git clone URL_DEL_REPOSITORIO
2. Instalar dependencias
npm install
3. Crear archivo `.env`
MONGO_URI=mongodb://localhost:27017/inventoryDB
PORT=3000
4. Ejecutar servidor
node server.js