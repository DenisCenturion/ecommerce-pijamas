//Variables globales

let contadorId = 1;
let productos = [];
let carrito = [];


//Mensaje de referencia
console.log("Ecommerce iniciado");

//CLASE PRODUCTO
class Producto{
        constructor({
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
        precio,
        stock,
        talle,
        descripcion,
        enOferta = false,
        image
    }) {
        this.id = id;
        this.titulo = titulo;
        this.marca = marca;
        this.modelo = modelo;
        this.genero = genero;
        this.cantidadDePiezas = cantidadDePiezas;
        this.temporada = temporada;
        this.composicion = composicion;
        this.tipoParteSuperior = tipoParteSuperior;
        this.tipoManga = tipoManga;
        this.tipoParteInferior = tipoParteInferior;
        this.precio = precio;
        this.stock = stock;
        this.talle = talle;
        this.descripcion = descripcion;
        this.enOferta = enOferta;
        this.image = image || "img/default.jpg";;
    }

    aumentarStock(cantidad){
        if(cantidad < 0 || isNaN(cantidad)){
            console.warn("Debe ingresar un numero mayor que 0");
        }else{
            this.stock+=cantidad;
            console.log(`La nueva cantidad es: ${this.stock}`);
        }
    }

    reducirStock(cantidad){
        if(cantidad < 0 || isNaN(cantidad)){
            console.warn("Debe ingresar un numero mayor que 0");
        }
        else{
            if(this.stock >= cantidad){
                    this.stock-=cantidad;
                    console.log(`La nueva cantidad es: ${this.stock}`);
                }else{
                    console.warn("La cantidad a recudir es mayor al stock, verifique la cantidad");
                }
        }
    }

    imprimirDetalleDelProducto() {
        console.log(`ID: ${this.id}`);
        console.log(`Titulo: ${this.titulo}`);
        console.log(`Marca: ${this.marca}`);
        console.log(`Modelo: ${this.modelo}`);
        console.log(`Género: ${this.genero}`);
        console.log(`Cantidad de piezas: ${this.cantidadDePiezas}`);
        console.log(`Temporada: ${this.temporada}`);
        console.log(`Composición: ${this.composicion}`);
        console.log(`Parte superior: ${this.tipoParteSuperior} (${this.tipoManga})`);
        console.log(`Parte inferior: ${this.tipoParteInferior}`);
        console.log(`Talle: ${this.talle}`);
        console.log(`Precio: $${this.precio}`);
        console.log(`Stock: ${this.stock}`);
        console.log(`Descripción: ${this.descripcion}`);
        console.log(this.enOferta ? "🔥 En oferta!" : "— Precio regular —");
        console.log("-------------------------------");
    }

    toJSON() {
      const {
        id, titulo, marca, modelo, genero, cantidadDePiezas, temporada,
        composicion, tipoParteSuperior, tipoManga, tipoParteInferior,
        precio, stock, talle, descripcion, enOferta, image
      } = this;
      return {
        id, titulo, marca, modelo, genero, cantidadDePiezas, temporada,
        composicion, tipoParteSuperior, tipoManga, tipoParteInferior,
        precio, stock, talle, descripcion, enOferta, image
      };
    }
    

    
}


class ItemCarrito{
    constructor({producto, cantidad}){
        this.producto = producto;
        this.cantidad = cantidad;
    }
}