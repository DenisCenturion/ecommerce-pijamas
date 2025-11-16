// ============================================
// app.js
// Punto de entrada principal del ecommerce
// ============================================

document.addEventListener("DOMContentLoaded", async () => {
  await inicializarAplicacion();
});

// ============================================
// FUNCIONES PRINCIPALES
// ============================================

/**
 * Inicializa la aplicación del ecommerce.
 * Carga productos y carrito desde el storage o desde la fuente (JSON).
 * Detecta la página actual e inicia los eventos correspondientes.
 */
async function inicializarAplicacion() {
  inicializarDatosGlobales();
  await cargarProductosEnMemoria();
  cargarCarritoEnMemoria();

  inicializarPaginaSegunContexto();
}

/**
 * Define las variables globales del sistema.
 * (solo si aún no existen, para evitar sobrescrituras)
 */
function inicializarDatosGlobales() {
  window.productos = window.productos || [];
  window.carrito = window.carrito || [];
}

/**
 * Carga los productos desde sessionStorage o desde data.js (JSON / manual).
 */
async function cargarProductosEnMemoria() {
  const productosGuardados = obtenerObjetoDeSessionStorage("productos");

  if (productosGuardados && productosGuardados.length > 0) {
    productos = productosGuardados.map(p => new Producto(p));
  } else {
    productos = await iniciarCargaDeProductos("api");
  }
}

function obtenerProductosDeMemoria() {
  return productos;
}


/**
 * Carga el carrito desde sessionStorage, o inicializa vacío.
 */
function cargarCarritoEnMemoria() {
  const carritoGuardado = obtenerObjetoDeSessionStorage("carrito");

  carrito = (carritoGuardado || []).map(
    item => new ItemCarrito({
      producto: new Producto(item.producto),
      cantidad: item.cantidad
    })
  );
}

/**
 * Detecta en qué página estamos (index, carrito o admin)
 * y dispara la inicialización específica.
 */
function inicializarPaginaSegunContexto() {
  if (document.getElementById("productos-container")) {
    iniciarEventosEnIndex();
    console.log("Página: Tienda");
  }

  if (document.getElementById("carrito-container")) {
    iniciarEventosCarrito();
    console.log("Página: Carrito");
  }

  if (document.getElementById("btnAlta")) {
    console.log("Página: Panel administrador");
  }
}



/*document.addEventListener("DOMContentLoaded", async () => {
    let productosGuardados = JSON.parse(sessionStorage.getItem('productos'));
    let carritoGuardado = JSON.parse(sessionStorage.getItem('carrito'));

    if (productosGuardados && productosGuardados.length > 0) {
        productos = productosGuardados.map(p => new Producto(p));
    } else {
        await iniciarCargaDeProductos("api");
    }

    carrito = (carritoGuardado || []).map(item => new ItemCarrito({
        producto: new Producto(item.producto),
        cantidad: item.cantidad
    })
);

    if (document.getElementById("productos-container")) {
        iniciarEventosEnIndex();
    }

    if (document.getElementById("carrito-container")) {
        iniciarEventosCarrito();
    }

    // Si estoy en admin.html
    if (document.getElementById("btnAlta")) {
      console.log("Panel administrador activo");
    }
});*/