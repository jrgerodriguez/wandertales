export class Elemento {
    constructor(contenedor, contenido) {
        this.contenedor = contenedor;
        this.contenido = contenido;
    }

    crearElemento() {
        this.contenedor.innerHTML = this.contenido
    }
}