# Visor para descargar fondos 
Este proyecto es un visor de imágenes web que permite mostrar imágenes en un slider central con navegación, descarga y una galería de miniaturas que se carga y actualiza dinámicamente. Está diseñado para ser fácil de mantener y ampliar, y para funcionar sin necesidad de un backend web.

## Demo en vivo
➡️<a href="https://alexarce2000.github.io/Fondos/" target="_blank">Sitio web</a>

## Características principales

- Slider con imágenes que se pueden navegar con botones "anterior" y "siguiente".
- Miniaturas que se actualizan a medida que cambian las imágenes del slider.
- Carga progresiva de miniaturas con botón "Cargar más" para evitar lentitud inicial.
- Botón para descargar la imagen activa del slider.
- Uso de fuente personalizada para estilo visual único.
- Separación clara entre HTML, CSS, JavaScript y recursos para facilitar mantenimiento.
- Script auxiliar en Python para actualizar automáticamente fondos y la lista de imágenes sin necesidad de backend.


## ¿Por qué usar el script Python?

El script `actualizar-fondos.py` sirve para generar automáticamente el archivo `imagenes.html`, que contiene las etiquetas `<img>` con las rutas de todas las imágenes disponibles en la carpeta `fondos/`.

Esto se hace porque:

- JavaScript que corre en el navegador **no puede acceder directamente al sistema de archivos** (por razones de seguridad).
- No se quiere usar un backend o servidor como Node.js, Flask, etc.
- Permite que el proyecto funcione perfectamente **como un sitio estático**

- Actualizar esa lista cuando se agregan o eliminan imágenes en el proyecto

De este modo, solo necesitas ejecutar el script localmente para mantener actualizada la lista de imágenes, y luego abrir el `index.html` directamente en el navegador sin configurar servidores o bases de datos.

Esto hace posible alojarlo en:
- GitHub Pages

## Uso

1. Coloca tus imágenes en las carpetas correspondientes (`fondos/`, `nombres/`).
2. Ejecuta el script Python `actualizar-fondos.py` para generar/actualizar la lista de imágenes.
3. Abre `index.html` directamente en un navegador para usar el visor.
4. Usa los botones para navegar, descargar imágenes y cargar miniaturas progresivamente.


## Notas

- La carga progresiva ayuda a evitar lentitud si hay muchas imágenes.
- El script Python es fundamental para mantener la lista de imágenes actualizada sin servidor.
- Puedes modificar fácilmente el archivo `nombres/imagenes.html` si quieres gestionar las imágenes manualmente.
