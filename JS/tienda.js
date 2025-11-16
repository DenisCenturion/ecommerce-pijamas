// ============================================
// tienda.js
// Funciones relacionadas exclusivamente con index.html
// ============================================

// ==============================
// Render de una tarjeta de producto
// ==============================
function renderProductoCard(producto, modo) {
  const buttonConfig = {
    agregar: `<button class="btn btn--primary btnAgregar" data-id="${producto.id}">Agregar al carrito</button>`,
    editar: `<button class="btn btn--warning btnEditar" data-id="${producto.id}">Editar</button>`,
    eliminar: `<button class="btn btn--danger btnEliminar" data-id="${producto.id}">Eliminar</button>`
  };

  return `
    <div class="producto-card" id="producto-${producto.id}">
      <h3>${producto.titulo}</h3>
      <span>Id: ${producto.id}</span>
      <p><strong>$${producto.precio}</strong></p>
      <img src="${producto.image}" alt="${producto.descripcion}">
      <p class="stock">Stock: ${producto.stock}</p>
      ${buttonConfig[modo]}
    </div>
  `;
}

// ==============================
// Render general de productos
// ==============================
function mostrarProductos(contenedorId, modo = "agregar", lista = productos) {
  const contenedor = document.getElementById(contenedorId);
  if (!contenedor) return;

  contenedor.innerHTML = "";
  lista.forEach(prod => {
    contenedor.innerHTML += renderProductoCard(prod, modo);
  });
}

// ==============================
// Eventos del INDEX
// ==============================
function iniciarEventosEnIndex() {
  mostrarProductos("productos-container", "agregar");

  document.querySelectorAll(".btnAgregar").forEach(boton => {
    boton.addEventListener("click", manejarClickAgregar);
  });
}

// ==============================
// Handler: agregar al carrito
// ==============================
function manejarClickAgregar(e) {
  const id = Number(e.target.dataset.id);
  const producto = productos.find(p => p.id === id);

  agregarAlCarrito(producto);
  actualizarTarjetaProducto(id);
}

// ==============================
// Actualizar stock visual
// ==============================
function actualizarTarjetaProducto(id) {
  const producto = productos.find(p => p.id === id);
  const card = document.getElementById(`producto-${id}`);
  if (!card) return;

  card.querySelector(".stock").textContent = `Stock: ${producto.stock}`;
}

function agregarAlCarrito(producto) {
    if(producto) {
        if(producto.stock >= 1){
            producto.reducirStock(1);
            let existeItemCarrito = carrito.find((itemCarrito) => producto.id == itemCarrito.producto.id);
            if(existeItemCarrito){
                existeItemCarrito.cantidad++;
            }
            else{
                let cantidad = 1;
                let productoAagregar = new ItemCarrito({
                        producto,
                        cantidad
                    })
                carrito.push(productoAagregar);
            }
            
            sessionStorage.setItem("productos", JSON.stringify(productos));
            sessionStorage.setItem("carrito", JSON.stringify(carrito));
            console.log("Producto agregado al carrito");
            console.log("Contenido actual del carrito:");
            console.log("Storage carrito:", JSON.parse(sessionStorage.getItem("carrito")));
        }
        else{
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Nos quedamos sin stock!",
              footer: '<a href="#">Contactanos a nuestro email para compras por mayor</a>'
            });
        }
    } else {
        Swal.fire({
            title: "No encontramos el producto solicitado",
            text: "Segui buscando entre los productos en stock",
            icon: "info"
        });
    }
    console.log("Carrito de compras:\n");
    for (let itemCarrito of carrito) {
        itemCarrito.producto.imprimirDetalleDelProducto();
    }
    console.log("Total a pagar: $" + carrito.reduce((total, itemCarrito) => total + (itemCarrito.producto.precio * itemCarrito.cantidad), 0));
}


