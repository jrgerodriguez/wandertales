document.querySelector("#nuevoArticuloFormulario").addEventListener("submit", (e) => {
    e.preventDefault()

    const enviarFormularioBtn = document.querySelector("#enviarFormularioBtn")

    enviarFormularioBtn.disabled = true;
    enviarFormularioBtn.value = "CARGANDO..."

    const formData = new FormData(e.target);

    fetch("/crear", {
        method: 'POST',
        body: formData
    })

    .then(response => response.json())
    .then(data => {
        if(data.success) {
            alert("Registro Exitoso")
            e.target.reset(); 
        } else {
            alert("Hubo un error al registrar el artículo");
        }
    })
    .catch(error => {
        console.error(error)
        alert("Hubo un error al procesar la solicitud")
    })
    .finally(() => {
        enviarFormularioBtn.disabled = false;
        enviarFormularioBtn.value = "ENVIAR";
    })
})