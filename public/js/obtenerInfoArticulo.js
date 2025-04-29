export async function obtenerInfoArticulo() {
  const contenidoArticulo = document.querySelector(".contenido-articulo");
  const params = new URLSearchParams(window.location.search);
  const articuloId = params.get("id");

  try {
    const response = await fetch(`/articulo?id=${articuloId}`);

    if (response.ok) {
      const data = await response.json();
      
      const usuarioInfo = await fetch(`/get-user/${data.autor}`)

      let info = {};

      if (usuarioInfo.ok) {
        info = await usuarioInfo.json()
      }

      const autorImagen = info.image || "images/default.jpg";
      const autorNombre = info.displayName || "Autor desconocido";

      contenidoArticulo.innerHTML += `
        <div class="articulo-encabezado width-85">
            <div class="contenedor-foto-articulo">
                <img src="${data.imagen}" alt="">
            </div> 
            <div class="contenedor-info-articulo">
                <h1>${data.titulo}</h1>
                <div class="autor-info">
                    <img src="${autorImagen}" alt="" loading="lazy">
                    <span>${autorNombre.toUpperCase()}</span>
                </div>
            </div>
        </div>

        <div class="articulo-texto width-85">
            <p>${data.contenido}</p>
        </div>
                `;
    }
  } catch (error) {
    console.error(error);
  }
}
