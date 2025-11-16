function mostrarSeccion(idAmostrar) {
    const secciones = document.querySelectorAll("main section");
    secciones.forEach(sec => sec.classList.add("oculto")); // oculto todas
    document.getElementById(idAmostrar).classList.remove("oculto"); // muestro la que quiero
}

//document.addEventListener("DOMContentLoaded", darDeAlta);

document.addEventListener("DOMContentLoaded", ()=>{
    darDeAlta();
    const tituloDeBusqueda = document.getElementById("tituloBusqueda");
    
    document.getElementById("btnAlta").addEventListener("click",  () => {
      mostrarSeccion("form-alta");
      
      const form = document.getElementById("formProducto");
      const titulo = document.querySelector("#form-alta h2");
      const botonSubmit = form.querySelector('button[type="submit"]');

      titulo.textContent = "Dar de alta un producto";
      botonSubmit.textContent = "Agregar producto";

      form.reset();
      delete form.dataset.idEditar;
    
    });
    document.getElementById("btnVer").addEventListener("click",  () => {
        mostrarSeccion("contenedor-resultado");
        verProductos();
    });
    document.getElementById("btnBuscar").addEventListener("click", () => {
        mostrarSeccion("form-buscar");
        tituloDeBusqueda.textContent ="Buscar producto:";
        buscarProducto("editar");
    });

    document.getElementById("btnActualizar").addEventListener("click", ()=>{
        mostrarSeccion("form-buscar");
        tituloDeBusqueda.textContent ="Buscar producto a actualizar:";
        buscarProducto("editar");
    });
    document.getElementById("btnEliminar").addEventListener("click", ()=>{
        mostrarSeccion("form-buscar");
        tituloDeBusqueda.textContent ="Buscar producto a eliminar:";
        buscarProducto("eliminar");
    });

});

function darDeAlta() {

    let formularioAdminDarDeAltaProducto = document.getElementById("formProducto");

    formularioAdminDarDeAltaProducto.addEventListener("submit", (e)=>{
        const idEditar = formularioAdminDarDeAltaProducto.dataset.idEditar;
        e.preventDefault();
        
        const titulo = document.getElementById("titulo").value;
        const marca= document.getElementById("marca").value;
        const modelo= document.getElementById("modelo").value;
        const genero= document.getElementById("genero").value;
        const cantidadDePiezas  = document.getElementById("cantidadDePiezas").value;//num: 2,
        const temporada= document.getElementById("temporada").value;
        const composicion= document.getElementById("composicion").value;
        const tipoParteSuperior = document.getElementById("tipoParteSuperior").value;
        const tipoManga= document.getElementById("tipoManga").value;
        const tipoParteInferior = document.getElementById("tipoParteInferior").value;
        const precio= document.getElementById("precio").value;//num           : 30000,
        const stock= document.getElementById("stock").value;//num          : 10,
        const talle= document.getElementById("talle").value;
        const descripcion= document.getElementById("descripcion").value;
        const image= document.getElementById("image").value || "";

        if(idEditar){
            const index = productos.findIndex(p => p.id === Number(idEditar));
            if (index !== -1) {
              productos[index] = new Producto({
                id: Number(idEditar),
                titulo,
                marca,
                modelo,
                genero,
                cantidadDePiezas,
                temporada,
                composicion,
                tipoParteSuperior,
                tipoManga,
                tipoParteInferior,
                precio: Number(precio),
                stock: Number(stock),
                talle,
                descripcion,
                image
              });
              
              Swal.fire({
                icon: "success",
                title: "Producto actualizado correctamente",
                timer: 2000,
                showConfirmButton: false
              });
            }
            sessionStorage.setItem("productos", JSON.stringify(productos));
            // Limpiar el flag
            delete formularioAdminDarDeAltaProducto.dataset.idEditar;

            formularioAdminDarDeAltaProducto.reset();

        } else {
            let id;
            if(productos.length > 0){
                id = productos.length + 1;
            }else{
                id = 1;
            }

            const producto = new Producto({
            id,
            titulo,
            marca,
            modelo,
            genero,
            cantidadDePiezas,
            temporada,
            composicion,
            tipoParteSuperior,
            tipoManga,
            tipoParteInferior,
            precio: Number(precio), // conviene convertir a número
            stock: Number(stock),
            talle,
            descripcion,
            image
            });
            productos.push(producto);
            sessionStorage.setItem("productos", JSON.stringify(productos));

            producto.imprimirDetalleDelProducto();

            Swal.fire({
              icon: "success",
              title: "Producto agregado correctamente",
              timer: 2000,
              showConfirmButton: false
            });

            formularioAdminDarDeAltaProducto.reset();
        }
    
    });//fin del eveto
    
    
}

//Funcion para ver todos los productos

function verProductos() {
    let cantidadProductos = productos.length;
    const contenedor = document.getElementById("contenedor-resultado");

    contenedor.innerHTML = "";

    const titulo = document.createElement("h2");
    titulo.classList.add("titulo-seccion");
    titulo.textContent = `Total productos: ${cantidadProductos}`;
    contenedor.prepend(titulo);

    mostrarProductos("contenedor-resultado", "editar");
    inicializarBotonesEditar();

    //mostrarProductos borra todo lo que encuentra, entonces debo agregar el titulo en esta seccion:
    contenedor.prepend(titulo);

    if(productos.length === 0){
        alert("No hay productos para mostrar");
    }
}

//Funcion para buscar un producto

function buscarProducto(modo){
    const formBuscar = document.getElementById("form-buscar");
    const inputBusqueda = document.getElementById("busqueda");
    const contenedorResultado = document.getElementById("contenedor-resultado");

    formBuscar.addEventListener("submit", (e)=>{
        e.preventDefault();

        const textoBusqueda = inputBusqueda.value.trim().toLowerCase();

        contenedorResultado.innerHTML = "";

        if(!textoBusqueda){
            Swal.fire({
                icon: "warning",
                title: "Campo vacio",
                text: "Por favor, escribe algo para buscar."
            });
            return;
        }

        const encontrados = productos.filter((p) => 
            p.titulo.toLowerCase().includes(textoBusqueda));

        if(encontrados.length > 0){
            mostrarSeccion("contenedor-resultado");
            if(modo === "editar"){
                mostrarProductos("contenedor-resultado", "editar", encontrados);
                inicializarBotonesEditar();
            }else{
                mostrarProductos("contenedor-resultado", "eliminar", encontrados);
                inicializarBotonesEliminar();
            }
            
        
            Swal.fire({
                icon: "success",
                title: "Resultados encontrados",
                text: `Se encontraron ${encontrados.length} producto(s).`,
                timer: 2000,
                showConfirmButton: false
            });
        }
        else{
            Swal.fire({
                icon: "warning",
                title: "No se encontraron resultados",
                text: `Intenta con otro tipo de pijamas.`,
                timer: 2000,
                showConfirmButton: false
            });
            contenedorResultado.innerHTML = "<p>No se encontraron productos con ese título.</p>";
        }
        

    });
}

function inicializarBotonesEditar() {
  document.querySelectorAll(".btnEditar").forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const id = Number(e.target.dataset.id);
      editarProducto(id);
    });
  });
}

function editarProducto(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto) {
      Swal.fire({
        icon: "error",
        title: "Producto no encontrado",
        text: "Verifica el ID e intenta nuevamente."
      });
      return;
    }

    // Muestra el formulario de alta 
    mostrarSeccion("form-alta");

    // Cambio el título y el botón
    document.querySelector("#form-alta h2").textContent = "Editar producto";
    const botonSubmit = document.querySelector("#formProducto button[type='submit']");
    botonSubmit.textContent = "Guardar cambios";
    
    // Precargar los valores
    document.getElementById("titulo").value = producto.titulo;
    document.getElementById("marca").value = producto.marca;
    document.getElementById("modelo").value = producto.modelo;
    document.getElementById("genero").value = producto.genero;
    document.getElementById("cantidadDePiezas").value = producto.cantidadDePiezas;
    document.getElementById("temporada").value = producto.temporada;
    document.getElementById("composicion").value = producto.composicion;
    document.getElementById("tipoParteSuperior").value = producto.tipoParteSuperior;
    document.getElementById("tipoManga").value = producto.tipoManga;
    document.getElementById("tipoParteInferior").value = producto.tipoParteInferior;
    document.getElementById("precio").value = producto.precio;
    document.getElementById("stock").value = producto.stock;
    document.getElementById("talle").value = producto.talle;
    document.getElementById("descripcion").value = producto.descripcion;
    document.getElementById("image").value = producto.image;

    // Guardamos el ID temporalmente para saber qué producto se está editando
    document.getElementById("formProducto").dataset.idEditar = id;
}



//Funcion para actualizar un producto
function actualizarProductoPorId() {
    let id = parseInt(prompt("Ingrese el ID del producto a actualizar"));
    let producto = productos.find(producto => producto.id === id);
    if(producto) {
        let marca = prompt("Ingrese la marca del producto:");
        let titulo = prompt("Ingrese el titulo del producto:");
        let modelo = prompt("Ingrese el modelo del producto:");
        let genero = prompt("Ingrese el genero de uso sugerido para el producto:");
        let cantidadDePiezas = prompt("Ingrese la cantidad de piezas:");
        let temporada = prompt("Ingrese la temporada:");
        let composicion = prompt("Ingrese la composicion del producto(algodon, poliester, modal ,etc):");
        let tipoParteSuperior = prompt("Ingrese el tipo de parte superior(camisa, remera, musculosa):");
        let tipoManga = prompt("Ingrese el tipo de manga:");
        let tipoParteInferior = prompt("Ingrese el tipo de parte inferior(short, pantalon):");
        let precio;
        do{
            precio = parseFloat(prompt("Ingrese el precio del producto:").trim());
            if (isNaN(precio) || precio <= 0) {
                alert("Debe ingresar un número válido mayor a 0.");
            }
        }while(isNaN(precio) || precio <= 0);
        let stock = prompt("Ingrese el stock del producto:");
        let talle = prompt("Ingrese el talle del producto:");
        let descripcion = prompt("Ingrese la descripcion del producto:");

        producto.marca = marca;
        producto.titulo = titulo;
        producto.modelo = modelo;
        producto.genero = genero;
        producto.cantidadDePiezas = cantidadDePiezas;
        producto.temporada = temporada;
        producto.composicion = composicion;
        producto.tipoParteSuperior = tipoParteSuperior;
        producto.tipoManga = tipoManga;
        producto.tipoParteInferior = tipoParteInferior;
        producto.precio = precio;
        producto.stock = stock;
        producto.talle = talle;
        producto.descripcion = descripcion;

        alert("Producto actualizado correctamente");
    } else {
        alert("No se encontro un producto con ese ID");
    }
}

function inicializarBotonesEliminar() {
  document.querySelectorAll(".btnEliminar").forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const id = Number(e.target.dataset.id);
      confirmarEliminacion(id);
    });
  });
}


function confirmarEliminacion(id) {
  const producto = productos.find(p => p.id === id);

  if (!producto) {
    Swal.fire({
      icon: "error",
      title: "Producto no encontrado",
      text: "Verifica el ID e intenta nuevamente."
    });
    return;
  }

  Swal.fire({
    title: `¿Eliminar "${producto.titulo}"?`,
    text: "Esta acción no se puede deshacer.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      eliminarProductoPorId(id);
    }
  });
}

function eliminarProductoPorId(id) {
  const index = productos.findIndex(p => p.id === id);
  if (index !== -1) {
    productos.splice(index, 1);
    sessionStorage.setItem("productos", JSON.stringify(productos));

    Swal.fire({
      icon: "success",
      title: "Producto eliminado correctamente",
      timer: 2000,
      showConfirmButton: false
    });

    // Volver a mostrar la lista actualizada
    verProductos();
  }
}


