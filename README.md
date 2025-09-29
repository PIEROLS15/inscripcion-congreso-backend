# 🎓 Inscripción Congreso – Backend  

[![CI](https://github.com/PIEROLS15/inscripcion-congreso-backend/actions/workflows/ci.yml/badge.svg)](https://github.com/PIEROLS15/inscripcion-congreso-backend/actions/workflows/ci.yml)  
![Node.js](https://img.shields.io/badge/node-%3E%3D20-green)  
![TypeScript](https://img.shields.io/badge/typescript-5.x-blue)  
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

Backend modular construido con **Express + TypeScript**. 
Incluye validaciones con **Yup**, linting con **ESLint/Prettier**, y CI con **GitHub Actions**.

---

## 🚀 Tecnologías principales

- [Node.js 20+](https://nodejs.org/) - Entorno de ejecución para JavaScript/TypeScript en el servidor
- [Express](https://expressjs.com/) – Framework minimalista para construir APIs en Node.js
- [TypeScript](https://www.typescriptlang.org/) - Superset de JavaScript
- [Yup](https://github.com/jquense/yup) – validaciones de inputs  
- [ESLint](https://eslint.org/) – reglas de estilo 
- [GitHub Actions](https://docs.github.com/en/actions) – CI/CD

---

## 📂 Estructura del proyecto

```bash
config/                      # Configuración (ej: variables de entorno)
prisma/                      # ORM para la base de datos
├── index.ts                 # Punto de entrada para inicializar la conexión
├── config.ts                # Lee variables de entorno y define la config
├── migrations/              # Scripts de migraciones
└── seeders/                 # Datos iniciales (usuarios de prueba, roles, etc.)
src/
├── api/                     # Módulos de negocio (cada API independiente)
│   └── hello/               # Ejemplo de API
│       ├── controllers/     # Controladores
│       ├── routes/          # Definición de rutas estilo
│       └── services/        # Lógica de negocio
├── database/                # Configuración y utilidades de base de datos
├── middlewares/             # Middlewares globales (errorHandler, validate, etc.)
├── types/                   # Tipos y utilidades compartidas
├── app.ts                   # Configuración de la app Express
└── server.ts                # Punto de entrada del servidor
tests/                       # Pruebas unitarias
uploads/                     # Almacenamiento de vouchers
```

## 🛠️ Instalación

### Prerequisitos

Asegúrate de tener [Node](https://nodejs.org/es/) instalado en tu sistema:

```bash
node -v
 ```

### Configuración del proyecto

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/PIEROLS15/inscripcion-congreso-backend.git
   cd inscripcion-congreso-backend
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   
3. **Levantar servicios de mysql:**
   ```bash
   Debes crear la base de datos en mysql, por ejemplo con el nombre: congreso_inscripcion_db
   
4. **Archivo .env:**
   ```bash
   DATABASE_URL="mysql://root:@localhost:3306/congreso_inscripcion_db"
   
5. **Ejecutar la creación de tablas:**
   ```bash
   npx prisma migrate dev

6. **Ejecutar los datos semillas:**
   ```bash
   npm run seed

## 🚀 Desarrollo

### Servidor de desarrollo

Inicia el servidor de desarrollo en `http://localhost:3010`:

```bash
npm run dev
```

### 🐳 Docker (Entorno Local)

Para ejecutar el proyecto usando Docker:

1. **Construir la imagen Docker:**
   ```bash
   docker build -t inscripcion-backend .
   ```

2. **Ejecutar el contenedor:**
   ```bash
   docker run -d -p 3000:3010 --env-file .env --name inscripcion-backend-container inscripcion-backend
   ```

3. **Verificar que el contenedor esté ejecutándose:**
   ```bash
   docker ps
   ```

4. **Ver los logs del contenedor:**
   ```bash
   docker logs inscripcion-backend-container
   ```

5. **Detener y eliminar el contenedor:**
   ```bash
   docker stop inscripcion-backend-container
   docker rm inscripcion-backend-container
   ```

El servidor estará disponible en `http://localhost:3000` y se conectará a la base de datos usando las variables del archivo `.env`.

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-api`)
3. Agrega tu módulo dentro de src/api/ (`ejemplo: user/`).
4. Ejecuta lint antes de hacer commit: npm run lint:fix.
5. Commit tus cambios (`git commit -m 'Add new api'`)
6. Push a la rama (`git push origin feature/nueva-api`)
7. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia GPL. Ver `LICENSE` para más detalles.

---

Desarrollado por [PIEROLS15](https://github.com/PIEROLS15) [gians96](https://github.com/gians96)para el VII CIISIC
