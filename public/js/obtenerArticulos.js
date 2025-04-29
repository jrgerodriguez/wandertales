export async function obtenerArticulos() {
  const cardsContainer = document.querySelector(".cards-container");

  try {
    const response = await fetch("/articulos");
    if (response.ok) {
      const articulos = await response.json();

      articulos.forEach((articulo) => {
        cardsContainer.innerHTML += ` 
            <div class="card">
                <div class="card-img-container">
                    <a href="articulo.html?id=${articulo._id}"><img src="${articulo.imagen}" alt=""></a>
                </div>

                <div class="card-title-container">
                    <a href="articulo.html?id=${articulo._id}"><h2>${articulo.titulo}</h2></a>
                </div>
            </div>
            `;
      });
    } else {
        console.log("No se pueden obtener los articulos")
    }
  } catch (error) {
    console.error(error);
  }
}
