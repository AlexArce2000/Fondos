const galeria = document.getElementById("galeria");
const listaImagenes = document.getElementById("listaImagenes");
const cargarMasBtn = document.getElementById("cargarMasBtn");

let images = [];
let currentIndex = 0;

const MINIATURAS_POR_BLOQUE = 7;
let miniaturaInicio = 0;
let miniaturaVisibleHasta = MINIATURAS_POR_BLOQUE;
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = Array(100).fill().map(() => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2 + 0.5,
    speedX: Math.random() * 0.5 - 0.25,
    speedY: Math.random() * 0.5 - 0.25,
    color: `rgba(255, 255, 255, ${Math.random() * 0.1 + 0.05})`
}));

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });
    requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
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
