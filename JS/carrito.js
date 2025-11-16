// ============================================
// carrito.js
// Manejo completo del carrito (render + acciones)
// ============================================

// ----------------------------
// Render de un item del carrito
// ----------------------------
function renderCarritoItem(item) {
  return `
    <div class="producto-card">
      <h3>${item.producto.titulo}</h3>
      <img src="${item.producto.image}" alt="${item.producto.descripcion}">
      <p>Precio: $${item.producto.precio}</p>

      <div class="cantidad-control">
        <button class="btnCantidad btnCantidad--menos" 
                data-id="${item.producto.id}" 
                data-accion="restar">−</button>

        <span class="cantidad-numero">${item.cantidad}</span>

        <button class="btnCantidad btnCantidad--mas" 
                data-id="${item.producto.id}" 
                data-accion="sumar">+</button>
      </div>

      <button class="btn btn--danger btnEliminar" 
              data-id="${item.producto.id}">Eliminar</button>
    </div>
  `;
}

// ----------------------------
// Render del carrito completo
// ----------------------------
function renderCarritoCompleto() {
  const contenedor = document.getElementById("carrito-container");
  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>Tu carrito está vacío por ahora.</p>";
    document.getElementById("total").textContent = "$0";
    return;
  }

  carrito.forEach(item => {
    contenedor.innerHTML += renderCarritoItem(item);
  });

  actualizarTotalCarrito();
}

// ----------------------------
// Cálculo del total
// ----------------------------
function actualizarTotalCarrito() {
  const total = carrito.reduce(
    (sum, item) => sum + item.producto.precio * item.cantidad,
    0
  );
  document.getElementById("total").textContent = "$" + total;
}

// ----------------------------
// Inicialización de eventos
// ----------------------------
function iniciarEventosCarrito() {
  renderCarritoCompleto();

  document.querySelectorAll(".btnCantidad").forEach(btn =>
    btn.addEventListener("click", manejarClickCantidad)
  );

  document.querySelectorAll(".btnEliminar").forEach(btn =>
    btn.addEventListener("click", manejarEliminarItem)
  );

  const botonComprar = document.getElementById("btnComprar");
  if (botonComprar) {
    botonComprar.replaceWith(botonComprar.cloneNode(true));
    document.getElementById("btnComprar")
      .addEventListener("click", manejarFinalizarCompra);
  }
}

// ----------------------------
// HANDLERS
// ----------------------------
function manejarClickCantidad(e) {
  const id = Number(e.target.dataset.id);
  const accion = e.target.dataset.accion;

  modificarCantidadDeCarrito(id, accion);
  guardarCarritoYProductos();
  iniciarEventosCarrito();
}

function manejarEliminarItem(e) {
  const id = Number(e.target.dataset.id);
  eliminarDelCarrito(id);
  iniciarEventosCarrito();
}

function manejarFinalizarCompra() {
  finalizarCompra();
}

// ----------------------------
// LÓGICA: modificar cantidad
// ----------------------------
function modificarCantidadDeCarrito(id, accion) {
  const item = carrito.find(i => i.producto.id === id);
  if (!item) return;

  const prodOriginal = productos.find(p => p.id === id);

  if (accion === "sumar") {
    if (prodOriginal.stock > 0) {
      item.cantidad++;
      prodOriginal.stock--;
    } else {
      Swal.fire({
        icon: "warning",
        title: "Sin stock disponible",
        text: "No hay más unidades."
      });
    }
  }

  if (accion === "restar") {
    if (item.cantidad > 1) {
      item.cantidad--;
      prodOriginal.stock++;
    } else {
      Swal.fire({
        title: `¿Eliminar "${item.producto.titulo}"?`,
        showCancelButton: true
      }).then(res => {
        if (res.isConfirmed) eliminarDelCarrito(id);
      });
    }
  }
}

// ----------------------------
// LÓGICA: eliminar del carrito
// ----------------------------
function eliminarDelCarrito(id) {
  const index = carrito.findIndex(i => i.producto.id === id);
  if (index === -1) return;

  const item = carrito[index];

  Swal.fire({
    title: `¿Eliminar "${item.producto.titulo}"?`,
    showCancelButton: true
  }).then(res => {
    if (res.isConfirmed) {
      const prod = productos.find(p => p.id === id);
      prod.stock += item.cantidad;

      carrito.splice(index, 1);

      guardarCarritoYProductos();

      Swal.fire({
        icon: "success",
        title: "Producto eliminado",
        timer: 1500,
        showConfirmButton: false
      });

      iniciarEventosCarrito();
    }
  });
}

//Funcion para finalizar compra
function finalizarCompra() {
  if (carrito.length > 0) {
    let total = carrito.reduce(
      (total, itemCarrito) =>
        total + itemCarrito.producto.precio * itemCarrito.cantidad,
      0
    );

    Swal.fire({
      title: "🎉 ¡Gracias por tu compra!",
      html: `<p>El total a pagar es:</p><h2 style="color:#0099cc;">$${total.toLocaleString("es-AR")}</h2>`,
      icon: "success",
      confirmButtonText: '<a href="index.html" style="color:white; text-decoration:none;">Volver a la tienda</a>',
      confirmButtonColor: "#0099cc",
      background: "#f9f9f9",
      timer: 6000,
      timerProgressBar: true
    });

    carrito = [];
    guardarCarritoYProductos();
    iniciarEventosCarrito();

  } else {
    Swal.fire({
      title: "🛍️ Tu carrito está vacío",
      text: "Agregá algún producto antes de finalizar la compra.",
      icon: "info",
      confirmButtonText: '<a href="index.html" style="color:white; text-decoration:none;">Volver a la tienda</a>',
      confirmButtonColor: "#0099cc",
      background: "#f9f9f9"
    });
  }
}

// ----------------------------
// GUARDAR CAMBIOS
// ----------------------------
function guardarCarritoYProductos() {
  guardarEnSessionStorage("carrito", carrito);
  guardarEnSessionStorage("productos", productos);
}
