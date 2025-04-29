import { Elemento } from "./Elemento.js";
import { headerHTML } from "./headerContenido.js";
import { footerHTML } from "./footerContenido.js";
import { obtenerArticulos } from "./obtenerArticulos.js";

document.addEventListener("DOMContentLoaded", () => {
  const header = new Elemento(document.querySelector("header"), headerHTML);
  const footer = new Elemento(document.querySelector("footer"), footerHTML);
  header.crearElemento();
  footer.crearElemento();

  obtenerArticulos()
});
