export async function publicarComentario() {

    const formularioComentario = document.querySelector("#formulario-comentario")
  
    formularioComentario.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const nombre = document.querySelector("#nombre").value
      const contenido = document.querySelector("#contenido-comentario").value
      const params = new URLSearchParams(window.location.search)
      const articuloId = params.get("id")
  
      try {
        const response = await fetch("/publicar-comentario", { //Para enviar desde el front end
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre,
            'contenido-comentario': contenido,
            articuloId
          })
        })
  
        if (response.ok) {
          formularioComentario.reset();
          location.reload();
          alert("Comentario Publicado")
        } else {
          console.error("Error al publicar comentario");
        }
      } catch (error) {
          console.error("Error:", err);
      }
      
    })
  }