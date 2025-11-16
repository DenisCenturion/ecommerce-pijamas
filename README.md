# 🛍️ Ecommerce de Pijamas  
Proyecto final en JavaScript — Base para el futuro “Nube Algodón”

---

## 📌 Descripción del Proyecto

Este es un ecommerce funcional de venta de pijamas, desarrollado con **HTML, CSS y JavaScript**, como parte del proyecto final del curso JavaScript.

Incluye:

- ✔ Listado dinámico de productos  
- ✔ Carrito de compras con persistencia  
- ✔ Panel administrador (CRUD completo)  
- ✔ Control de stock en tiempo real  
- ✔ Notificaciones modernas (SweetAlert2)  
- ✔ Código modular y preparado para migración a React  

Este proyecto es la base del futuro ecommerce **“Nube Algodón”**, que más adelante será migrado a **React + Backend en Java/Spring Boot**.

---

## 🚀 Tecnologías utilizadas

- **HTML5**
- **CSS3** (Flexbox, Grid, responsive)
- **JavaScript ES6+**
- **SweetAlert2**
- **SessionStorage**
- **Modularización en múltiples archivos JS**

---

## 🧱 Estructura del Proyecto

```txt
/ecommerce/
│
├── index.html              # Página principal (tienda)
├── carrito.html            # Vista del carrito
├── admin.html              # Panel administrador
│
├── /css/
│   └── estilos.css
│
├── /js/
│   ├── app.js              # Punto de entrada global
│   ├── classes.js          # Clases Producto e ItemCarrito
│   ├── data.js             # Carga inicial de productos
│   ├── tienda.js           # Lógica de la tienda (index)
│   ├── carrito.js          # Lógica del carrito
│   ├── admin.js            # CRUD administrador
│   ├── storage.js          # SessionStorage helpers
│   └── productos.json      # Datos iniciales
│
└── /img/
    ├── riverplate.jpg
    ├── mafalda.jpg
    ├── default.jpg
    └── (otros)
```

---

## ⚙️ Características principales

### 🛒 1. Tienda
- Listado dinámico de productos  
- Botón **Agregar al carrito**  
- Stock actualizado en tiempo real  
- Renderizado mediante funciones puras  

### 🛍️ 2. Carrito de Compras
- Aumentar / disminuir cantidad  
- Eliminar productos  
- Cálculo automático del total  
- Persistencia en SessionStorage  
- SweetAlert2 para mensajes de compra  

### 🧑‍💼 3. Administrador (CRUD completo)
- Alta de productos  
- Edición con formulario precargado  
- Búsqueda por título  
- Eliminación con confirmación  
- Vista general de productos  

### 💾 4. Persistencia
El sistema guarda automáticamente:

- Productos  
- Carrito  
- Cambios de stock  

Todo centralizado en **storage.js** para facilitar una futura migración a LocalStorage o un backend real.

---

## 🧩 Modularización del Código

El proyecto se diseñó siguiendo buenas prácticas:

- Funciones pequeñas, claras y de una única responsabilidad (SRP)
- Lógica separada por archivos  
- Reutilización de componentes como:  
  - `renderProductoCard()`  
  - `renderCarritoItem()`  
- Código preparado para React:  
  - Renderizado por función  
  - Sin mezclar la lógica con el DOM  
  - Datos separados de la vista  

---

## 🧪 Estado actual del proyecto

- ✔ 100% funcional  
- ✔ Modular y escalable  
- ✔ Preparado para migración a React  

**Próximos pasos:**
- Migración a **React + Vite**
- Implementar backend en **Java / Spring Boot**
- Autenticación y roles
- Pasarela de pagos simulada

---

## ▶️ Cómo ejecutar el proyecto

Clonar el repositorio:

```bash
git clone https://github.com/DenisCenturion/ecommerce-pijamas
Abrir la carpeta en VSCode

Instalar la extensión Live Server

Abrir index.html

Clic en Go Live
```

## Autor

Denis Centurion

Desarrollador Java + Integraciones | Estudiante Front-End React
GitHub: https://github.com/DenisCenturion

