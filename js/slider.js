const galeria = document.getElementById("galeria");
let images = [];
let currentIndex = 0;

function showImage(index) {
    images.forEach((img, i) => {
        img.classList.toggle("active", i === index);
    });
}

function setupSlider() {
    images = document.querySelectorAll('.slider img');
    if (images.length > 0) {
        showImage(0);
    }
}

// Cargar imágenes desde archivo HTML externo
fetch("nombres/imagenes.html")
    .then(response => response.text())
    .then(html => {
        galeria.insertAdjacentHTML("afterbegin", html);
        setupSlider();
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


const downloadBtn = document.getElementById("downloadBtn");

downloadBtn.addEventListener("click", () => {
    const activeImg = document.querySelector(".slider img.active");
    if (!activeImg) return alert("No hay imagen activa para descargar.");

    const imageUrl = activeImg.src;  // URL original
    const imageName = imageUrl.split("/").pop();

    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = imageName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
