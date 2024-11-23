// Evento de click en el btn de busqueda
document.getElementById("btnBuscar").addEventListener("click", function () {
    const buscarPlaneta = document.getElementById("inputBuscar").value.trim();
  
    // Envia una alerta si no se ingresa nada en el campo de busqueda
    if (buscarPlaneta === "") {
      alert("Por favor, ingresa algo en la barra de búsqueda.");
      return;
    }
  
    // URL de la API a usar
    const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(buscarPlaneta)}`;
  
    // Fetch a la API

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const items = data.collection.items;
        const contenedor = document.getElementById("contenedor");
  
        // Limpia resultados anteriores y verifica si hay resultados
        contenedor.innerHTML = "";
  
        if (items && items.length > 0) {

          // Analiza los resultados y muestra las imágenes
          items.forEach(item => {
            const datos = item.data[0];
            const imgUrl = item.links ? item.links[0].href : '';
            const titulo = datos.title || "Sin título";
            const descripcion = datos.description || "Descripción no disponible";
            const fecha = datos.date_created || "Fecha no disponible";
  
            // Crea el contenedor con la info/imagen
            const imgContenedor = document.createElement("div");
            imgContenedor.classList.add("col-md-4", "mb-4");
  
            imgContenedor.innerHTML = `
              <div class="card">
                <img src="${imgUrl}" class="card-img-top" alt="${titulo}">
                <div class="card-body">
                  <h5 class="card-title">${titulo}</h5>
                  <p class="card-text">${descripcion}</p>
                  <p class="card-text"><small class="text-muted">${fecha}</small></p>
                </div>
              </div>
            `;
  
            // Agrega la tarjeta al contenedor
            contenedor.appendChild(imgContenedor);
          });
        } else {
          // Si no se encuentran resultados
          contenedor.innerHTML = "<p>No se encontraron resultados para su búsqueda.</p>";
        }
      })
      .catch(error => {
        console.error("Error al obtener los datos de la API:", error);
        alert("Hubo un problema al obtener los resultados.");
      });
  });
