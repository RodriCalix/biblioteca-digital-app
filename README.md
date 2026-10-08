# 📚 Biblioteca Digital App

Este proyecto es una aplicación móvil desarrollada como práctico para la materia de **Diseño y Programación de Software Multiplataforma (DPS)**. Su objetivo es gestionar el inventario de una biblioteca virtual, permitiendo realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre un catálogo de libros.

### 👨‍💻 Desarrolladores
* Rodrigo Calixto - CL230353
* Luis Cuadra - CC230464

🔗 **Repositorio:** [github.com/RodriCalix/biblioteca-digital-app](https://github.com/RodriCalix/biblioteca-digital-app)

## 🛠️ Tecnologías Utilizadas

* **Frontend Móvil:** [React Native](https://reactnative.dev/)
* **Framework:** [Expo](https://expo.dev/) (SDK 57)
* **Navegación:** [Expo Router](https://docs.expo.dev/router/introduction/) (Enrutamiento basado en archivos)
* **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) para tipado estricto
* **Peticiones HTTP:** [Axios](https://axios-http.com/)
* **Backend Simulado:** [MockAPI.io](https://mockapi.io/)

---

## 🏗️ ¿Qué se hizo y cómo se construyó? (Arquitectura)

El proyecto se construyó siguiendo un plan estructurado en fases para garantizar buenas prácticas, modularidad y código limpio:

### 1. Configuración del Backend (MockAPI)
Se creó un servicio RESTful simulado en `MockAPI.io` con un endpoint `/books`. La estructura de datos incluye campos como título, autor, año, género, URL de portada, calificación y un estado ("Disponible" o "Prestado").

### 2. Arquitectura Base y Navegación
Se utilizó la plantilla de `Expo Router` para establecer un sistema de navegación moderno:
* **Tab Navigation:** Para las vistas principales (Catálogo, Agregar Libro, Configuración).
* **Stack Navigation:** Para las vistas de profundidad (Pantalla de detalles del libro).

### 3. Servicios y Tipado Estricto (TypeScript)
Se definió el modelo de datos exacto (`src/types/Entity.ts`) y se configuró una instancia centralizada de Axios (`services/api.ts`) con interceptores para manejar timeouts, cabeceras y logueo de peticiones. Toda la lógica de comunicación con la API se separó en un servicio dedicado (`services/resourceService.ts`).

### 4. Componentes UI Reutilizables
Para mantener la consistencia visual y reducir código duplicado, se crearon componentes clave:
* `CustomInput`: Un campo de texto inteligente con soporte para validaciones, mensajes de error y etiquetas.
* `ItemCard`: Tarjeta de presentación de cada libro en el catálogo, que incluye lógica condicional para mostrar un *badge* verde ("Disponible") o naranja ("Prestado").
* `LoadingSpinner`: Indicador visual genérico para tiempos de carga.

### 5. Pantallas y Lógica de Negocio (CRUD)
* **Catálogo (`GET`):** Usa `useFocusEffect` para refrescar los datos automáticamente al entrar a la pantalla. Incluye un buscador local para filtrar por título y autor en tiempo real, e implementa "Pull-to-refresh".
* **Crear (`POST`):** Un formulario interactivo con validación estricta, selector visual de estrellas (Rating) y botones para definir el estado antes de enviar la petición a la API.
* **Detalle y Edición (`PUT` / `DELETE`):** Recupera el `id` de los parámetros de la ruta. Permite cambiar el estado del libro o su calificación con un solo toque (`PATCH`/`PUT`). Incluye un botón de eliminación que despliega un diálogo nativo de confirmación de seguridad antes de ejecutar el `DELETE`.

---

## 🚀 Cómo ejecutar este proyecto en otra máquina

Si descargaste o clonaste este repositorio en una computadora nueva, sigue estos pasos para poner a correr la aplicación:

### Requisitos Previos
1. Tener [Node.js](https://nodejs.org/) instalado (versión 18 o superior).
2. Tener [Git](https://git-scm.com/) instalado.
3. Para probar en un celular físico: Instalar la app **Expo Go** en tu dispositivo Android o iOS.

### Instrucciones de Instalación

**1. Clonar el repositorio**
Abre una terminal y clona este proyecto:
```bash
git clone https://github.com/RodriCalix/biblioteca-digital-app.git
cd biblioteca-digital-app
```

**2. Instalar las dependencias**
Descarga todos los paquetes necesarios de Node y Expo:
```bash
npm install
```

**3. (Opcional) Poblar la base de datos**
Si el backend en MockAPI está vacío y necesitas datos de prueba para empezar, ejecuta el script de *seed* incluido en el proyecto:
```bash
node scripts/seed-data.js
```
*(Esto insertará 10 libros de ejemplo en la base de datos).*

**4. Iniciar el servidor de desarrollo**
Ejecuta el siguiente comando para levantar el servidor de Expo Metro:
```bash
npm start
```

### Formas de visualizar la App

Una vez que ejecutes `npm start`, aparecerá un código QR en la terminal. Puedes correr la app de las siguientes maneras:

* **📱 Celular Físico (Recomendado):**
  * Conecta tu celular y tu computadora a la **misma red Wi-Fi**.
  * Abre la aplicación de cámara de tu celular o la app **Expo Go** y escanea el código QR de la terminal.

* **🌐 Navegador Web:**
  * En la terminal, presiona la tecla **`w`**. La aplicación se abrirá en modo web en tu navegador.

* **💻 Emulador de Android / iOS:**
  * Si tienes Android Studio configurado con un dispositivo virtual, presiona la tecla **`a`**.
  * Si tienes una Mac con Xcode, presiona **`i`** para abrir el simulador de iOS.

