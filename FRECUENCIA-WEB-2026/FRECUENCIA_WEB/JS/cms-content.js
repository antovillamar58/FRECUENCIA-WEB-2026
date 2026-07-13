document.addEventListener("DOMContentLoaded", async function () {
  try {
    const respuesta = await fetch("./content/inicio.json", {
      cache: "no-store"
    });

    if (!respuesta.ok) {
      throw new Error(
        "No se pudo cargar inicio.json. Código: " + respuesta.status
      );
    }

    const datos = await respuesta.json();

    const portada = document.getElementById("portada-principal");
    const titulo = document.getElementById("titulo-inicio");
    const subtitulo = document.getElementById("subtitulo-inicio");
    const boton = document.getElementById("boton-inicio");

    if (titulo && datos.titulo) {
      titulo.textContent = datos.titulo;
    }

    if (subtitulo && datos.subtitulo) {
      subtitulo.textContent = datos.subtitulo;
    }

    if (boton) {
      if (datos.boton) {
        boton.textContent = datos.boton;
      }

      boton.onclick = function () {
        const destino = datos.enlace_boton || "#contenido";

        if (destino.startsWith("#")) {
          const seccion = document.querySelector(destino);

          if (seccion) {
            seccion.scrollIntoView({
              behavior: "smooth"
            });
          }
        } else {
          window.location.href = destino;
        }
      };
    }

    if (portada && datos.fondo) {
      portada.style.backgroundImage =
        `linear-gradient(
          120deg,
          rgba(74, 20, 110, 0.72),
          rgba(73, 88, 38, 0.62),
          rgba(255, 120, 0, 0.55)
        ),
        url("${datos.fondo}")`;

      portada.style.backgroundSize = "cover";
      portada.style.backgroundPosition = "center";
    }

  } catch (error) {
    console.error("Error cargando la portada:", error);
  }
});
