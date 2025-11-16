//TODO... La carga inicial solo debe mostrar los mejores productos, en oferta, seleccionados, etc

// ==============================
// data.js
// Módulo de inicialización de productos
// ==============================

//ANTES
/* async function iniciarCargaDeProductos(origen = "manual") {
  if (origen === "manual") {
    // ...productos hardcodeados
    sessionStorage.setItem("productos", JSON.stringify(productos));
  } else if (origen === "api") {
    await obtenerProductosDesdeJson();
  }
}

async function obtenerProductosDesdeJson() {
  try {
    const response = await fetch('./JS/productos.json');
    if (!response.ok) {
      throw new Error("Error en cargar los productos desde el JSON");
    }
    const data = await response.json();
    productos = data.map(p => new Producto(p));
    sessionStorage.setItem("productos", JSON.stringify(data));
  } catch (error) {
    console.error("Function obtenerProductosDesdeJson", error);
  }
} */

async function iniciarCargaDeProductos(origen = "manual") {
  if (origen === "manual") {
    productos = generarProductosIniciales();
  } else if (origen === "api") {
    productos = await cargarProductosDesdeJson("./js/productos.json");
  } else {
    console.warn(`Origen de carga desconocido: "${origen}"`);
    productos = [];
  }

  guardarEnSessionStorage("productos", productos);
  return productos;
}

async function cargarProductosDesdeJson(ruta = "./js/productos.json") {
  try {
    const response = await fetch(ruta);
    if (!response.ok) {
      throw new Error(`Error al cargar los productos desde "${ruta}"`);
    }

    const data = await response.json();
    return data.map(p => new Producto(p));

  } catch (error) {
    console.error("Error en cargarProductosDesdeJson:", error);
    return [];
  }
}

async function generarProductosIniciales() {
    // carga hardcodeada
    productos = [new Producto({
                    id: contadorId,
                    titulo: "Pijama River 1",
                    marca: "DreamWear",
                    modelo: "River libertadores",
                    genero: "Unisex",
                    cantidadDePiezas: 2,
                    temporada: "Invierno",
                    composicion: "80% algodón, 20% poliéster",
                    tipoParteSuperior: "Remera",
                    tipoManga: "Larga",
                    tipoParteInferior: "Pantalón",
                    precio: 15999,
                    stock: 10,
                    talle: "M",
                    descripcion: "Pijama abrigado de polar ideal para noches frías",
                    image: "img/riverplate.jpg"
                }),
                new Producto({
                    id: ++contadorId,
                    titulo: "Pijama River",
                    marca: "DreamWear",
                    modelo: "River Julian Alvarez",
                    genero: "Unisex",
                    cantidadDePiezas: 2,
                    temporada: "Invierno",
                    composicion: "80% algodón, 20% modal",
                    tipoParteSuperior: "Remera",
                    tipoManga: "Larga",
                    tipoParteInferior: "Pantalón",
                    precio: 18000,
                    stock: 10,
                    talle: "M",
                    descripcion: "Pijama abrigado de polar ideal para noches frías"
                }),
                new Producto({
                    id: ++contadorId,
                    titulo: "Pijama Godoy Cruz",
                    marca: "DreamWear",
                    modelo: "Cancha",
                    genero: "Unisex",
                    cantidadDePiezas: 2,
                    temporada: "Primavera",
                    composicion: "80% algodón, 20% poliéster",
                    tipoParteSuperior: "Remera",
                    tipoManga: "Larga",
                    tipoParteInferior: "Pantalón",
                    precio: 16000,
                    stock: 10,
                    talle: "M",
                    descripcion: "Pijama abrigado de algodon ideal para noches frías"
                }),
                new Producto({
                    id: ++contadorId,
                    titulo: "Pijama Thor",
                    marca: "DreamWear",
                    modelo: "Martillo trueno",
                    genero: "Unisex",
                    cantidadDePiezas: 2,
                    temporada: "Invierno",
                    composicion: "80% algodón, 20% poliéster",
                    tipoParteSuperior: "Remera",
                    tipoManga: "Larga",
                    tipoParteInferior: "Pantalón",
                    precio: 21000,
                    stock: 10,
                    talle: "M",
                    descripcion: "Pijama de modal ideal para noches frías"
                }),
                new Producto({
                    id: ++contadorId,
                    titulo: "Pijama Superman",
                    marca: "DreamWear",
                    modelo: "Superman volando",
                    genero: "Unisex",
                    cantidadDePiezas: 2,
                    temporada: "Invierno",
                    composicion: "80% algodón, 20% poliéster",
                    tipoParteSuperior: "Remera",
                    tipoManga: "Larga",
                    tipoParteInferior: "Pantalón",
                    precio: 17000,
                    stock: 10,
                    talle: "M",
                    descripcion: "Pijama abrigado de polar ideal para noches frías"
                }),
                new Producto({
                    id: ++contadorId,
                    titulo: "Pijama Batman",
                    marca: "DreamWear",
                    modelo: "Batman ciudad",
                    genero: "Unisex",
                    cantidadDePiezas: 2,
                    temporada: "Invierno",
                    composicion: "80% algodón, 20% poliéster",
                    tipoParteSuperior: "Remera",
                    tipoManga: "Larga",
                    tipoParteInferior: "Pantalón",
                    precio: 12300,
                    stock: 10,
                    talle: "M",
                    descripcion: "Pijama ideal para noches de Invierno"
                }),
                new Producto({
                    id: ++contadorId,
                    titulo: "Pijama Flash",
                    marca: "DreamWear",
                    modelo: "Flash corriendo",
                    genero: "Unisex",
                    cantidadDePiezas: 2,
                    temporada: "Invierno",
                    composicion: "80% algodón, 20% poliéster",
                    tipoParteSuperior: "Remera",
                    tipoManga: "Larga",
                    tipoParteInferior: "Short",
                    precio: 19000,
                    stock: 10,
                    talle: "M",
                    descripcion: "Pijama de dos piezas ideal para regalo"
                }),
                new Producto({
                    id: ++contadorId,
                    titulo: "Pijama Mafalda",
                    marca: "DreamWear",
                    modelo: "Mafalda diario",
                    genero: "Unisex",
                    cantidadDePiezas: 2,
                    temporada: "Invierno",
                    composicion: "80% algodón, 20% poliéster",
                    tipoParteSuperior: "Remera",
                    tipoManga: "Larga",
                    tipoParteInferior: "Pantalón",
                    precio: 30000,
                    stock: 10,
                    talle: "M",
                    descripcion: "Pijama Mafalda leyendo",
                    image: "img/mafalda.jpg"
                }),
                new Producto({
                    id: ++contadorId,
                    titulo: "Pijama Hulk",
                    marca: "DreamWear",
                    modelo: "Hulk saltando",
                    genero: "Unisex",
                    cantidadDePiezas: 2,
                    temporada: "Otoño",
                    composicion: "80% algodón, 20% poliéster",
                    tipoParteSuperior: "Remera",
                    tipoManga: "Larga",
                    tipoParteInferior: "Pantalón",
                    precio: 14000,
                    stock: 10,
                    talle: "M",
                    descripcion: "Pijama otoño 2 piezas"
                }),
                new Producto({
                    id: ++contadorId,
                    titulo: "Pijama Flecha",
                    marca: "DreamWear",
                    modelo: "Flecha edificio alto",
                    genero: "Unisex",
                    cantidadDePiezas: 2,
                    temporada: "Invierno",
                    composicion: "80% algodón, 20% poliéster",
                    tipoParteSuperior: "Remera",
                    tipoManga: "Larga",
                    tipoParteInferior: "Pantalón",
                    precio: 12000,
                    stock: 10,
                    talle: "M",
                    descripcion: "Pijama ideal para niños"
                }),
                new Producto({
                    id: ++contadorId,
                    titulo: "Pijama Thanos",
                    marca: "DreamWear",
                    modelo: "Thanos guante",
                    genero: "Unisex",
                    cantidadDePiezas: 2,
                    temporada: "Invierno",
                    composicion: "80% algodón, 20% poliéster",
                    tipoParteSuperior: "Remera",
                    tipoManga: "Larga",
                    tipoParteInferior: "Pantalón",
                    precio: 11000,
                    stock: 10,
                    talle: "M",
                    descripcion: "Pijama Invierno Thor guante"
                }),
                new Producto({
                    id: ++contadorId,
                    titulo: "Pijama Tralalero",
                    marca: "DreamWear",
                    modelo: "Winter Cozy",
                    genero: "Unisex",
                    cantidadDePiezas: 2,
                    temporada: "Verano",
                    composicion: "80% algodón, 20% poliéster",
                    tipoParteSuperior: "Remera",
                    tipoManga: "Larga",
                    tipoParteInferior: "Pantalón",
                    precio: 14123,
                    stock: 10,
                    talle: "M",
                    descripcion: "Pijama tralalero"
                }),
                new Producto({
                    id: ++contadorId,
                    titulo: "Pijama Alma",
                    marca: "DreamWear",
                    modelo: "Winter Cozy",
                    genero: "Unisex",
                    cantidadDePiezas: 2,
                    temporada: "Invierno",
                    composicion: "80% algodón, 20% poliéster",
                    tipoParteSuperior: "Remera",
                    tipoManga: "Larga",
                    tipoParteInferior: "Pantalón",
                    precio: 16873,
                    stock: 10,
                    talle: "S",
                    descripcion: "Pijama abrigado de polar ideal para noches frías"
                }),
                new Producto({
                    id: ++contadorId,
                    titulo: "Pijama Alma Primavera",
                    marca: "DreamWear",
                    modelo: "Winter Cozy",
                    genero: "Unisex",
                    cantidadDePiezas: 2,
                    temporada: "Invierno",
                    composicion: "80% algodón, 20% poliéster",
                    tipoParteSuperior: "Remera",
                    tipoManga: "Larga",
                    tipoParteInferior: "Pantalón",
                    precio: 16873,
                    stock: 10,
                    talle: "M",
                    descripcion: "Pijama abrigado de polar ideal para noches frías"
                }),
                new Producto({
                    id: ++contadorId,
                    titulo: "Pijama Alma Corazones",
                    marca: "DreamWear",
                    modelo: "Winter Cozy",
                    genero: "Unisex",
                    cantidadDePiezas: 2,
                    temporada: "Invierno",
                    composicion: "80% algodón, 20% poliéster",
                    tipoParteSuperior: "Remera",
                    tipoManga: "Larga",
                    tipoParteInferior: "Pantalón",
                    precio: 16873,
                    stock: 10,
                    talle: "L",
                    descripcion: "Pijama abrigado de polar ideal para noches frías"
                }),
                new Producto({
                    id: ++contadorId,
                    titulo: "Pijama Alma polar",
                    marca: "DreamWear",
                    modelo: "Winter Cozy",
                    genero: "Unisex",
                    cantidadDePiezas: 2,
                    temporada: "Invierno",
                    composicion: "80% algodón, 20% poliéster",
                    tipoParteSuperior: "Remera",
                    tipoManga: "Larga",
                    tipoParteInferior: "Pantalón",
                    precio: 16873,
                    stock: 10,
                    talle: "XL",
                    descripcion: "Pijama abrigado de polar ideal para noches frías",
                    enOferta : true
                })
    ];
    
    return productos;

}

