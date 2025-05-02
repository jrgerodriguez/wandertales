export async function mostrarComentarios() {
    const comentariosContenedor = document.querySelector(".comentarios")
    const params = new URLSearchParams(window.location.search)
    const articuloId = params.get("id")

    try {
        const response = await fetch(`/mostrar-comentarios/${articuloId}`)
        if (response.ok) {
            const comentarios = await response.json()
            
            comentarios.forEach((comentario) => {
                comentariosContenedor.innerHTML += `
                <div class="comentario">
                    <p><span class="span negrita">${comentario.nombre.toUpperCase()}</span></p>
                    <p class="comentario-texto">${comentario.contenido}</p>
                </div>
                `;
            })
        }
    } catch (error) {
        console.error(error);
    }
}