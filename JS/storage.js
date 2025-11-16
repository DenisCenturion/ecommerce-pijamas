// storage.js
// ==============================
// Funciones utilitarias para manejar sessionStorage
// ==============================

/**
 * Guarda un valor (objeto o primitivo) en sessionStorage.
 * Convierte automáticamente a JSON si es un objeto.
 */
function guardarEnSessionStorage(clave, valor) {
  const valorAguardar = (typeof valor === "object") ? JSON.stringify(valor) : valor;
  sessionStorage.setItem(clave, valorAguardar);
}

function obtenerTextoDeSessionStorage(clave) {
  return sessionStorage.getItem(clave);
}

function obtenerObjetoDeSessionStorage(clave) {
  const data = sessionStorage.getItem(clave);
  try {
    return data ? JSON.parse(data) : null;
  } catch {
    console.warn(`No se pudo parsear el valor de sessionStorage["${clave}"]`);
    return null;
  }
}

function eliminarClaveDeSessionStorage(clave) {
  sessionStorage.removeItem(clave);
}

function limpiarSessionStorage() {
  sessionStorage.clear();
}
