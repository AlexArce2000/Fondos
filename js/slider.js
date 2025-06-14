const galeria = document.getElementById("galeria");
const listaImagenes = document.getElementById("listaImagenes");
const cargarMasBtn = document.getElementById("cargarMasBtn");

let images = [];
let currentIndex = 0;

const MINIATURAS_POR_BLOQUE = 7;
let miniaturaInicio = 0;
let miniaturaVisibleHasta = MINIATURAS_POR_BLOQUE;

function showImage(index) {
    images.forEach((img, i) => {
        img.classList.toggle("active", i === index);
    });

    currentIndex = index;

    const nuevoInicio = Math.floor(currentIndex / MINIATURAS_POR_BLOQUE) * MINIATURAS_POR_BLOQUE;

    if (nuevoInicio < miniaturaInicio || nuevoInicio >= miniaturaVisibleHasta) {
        miniaturaInicio = nuevoInicio;
        miniaturaVisibleHasta = nuevoInicio + MINIATURAS_POR_BLOQUE;
        crearMiniaturas();
    } else {
        actualizarMiniaturas();
    }
}

function setupSlider() {
    images = document.querySelectorAll('.slider img');
    if (images.length > 0) {
        showImage(0);
    }
}

fetch("nombres/imagenes.html")
    .then(response => response.text())
    .then(html => {
        galeria.insertAdjacentHTML("afterbegin", html);
        setupSlider();
        crearMiniaturas();
    })
    .catch(error => {
        console.error("Error al cargar las imágenes:", error);
    });

document.getElementById("prevBtn").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
});

document.getElementById("nextBtn").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
});

document.getElementById("downloadBtn").addEventListener("click", () => {
    const activeImg = document.querySelector(".slider img.active");
    if (!activeImg) return alert("No hay imagen activa para descargar.");

    const imageUrl = activeImg.src;
    const imageName = imageUrl.split("/").pop();

    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = imageName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

function crearMiniaturas() {
    listaImagenes.innerHTML = "";

    const fin = Math.min(miniaturaVisibleHasta, images.length);

    for (let i = miniaturaInicio; i < fin; i++) {
        const img = images[i];

        const miniatura = document.createElement("div");
        miniatura.classList.add("miniatura");

        const miniImg = document.createElement("img");
        miniImg.src = img.src;
        miniImg.alt = img.alt;

        miniatura.appendChild(miniImg);

        miniatura.addEventListener("click", () => {
            currentIndex = i;
            showImage(currentIndex);
        });

        listaImagenes.appendChild(miniatura);
    }

    actualizarMiniaturas();
}

function actualizarMiniaturas() {
    const miniaturas = document.querySelectorAll(".miniatura");
    miniaturas.forEach((mini, i) => {
        mini.classList.toggle("active", i + miniaturaInicio === currentIndex);
    });
}

// Botón "Cargar más"
cargarMasBtn.addEventListener("click", () => {
    if (miniaturaVisibleHasta < images.length) {
        miniaturaVisibleHasta += MINIATURAS_POR_BLOQUE;
        crearMiniaturas();
    }
});
