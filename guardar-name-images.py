import os
import json

def main():
    # Ruta donde está el script
    directorio_actual = os.path.dirname(os.path.abspath(__file__))

    # Carpeta origen de las imágenes
    carpeta_origen = os.path.join(directorio_actual, "fondos")
    if not os.path.isdir(carpeta_origen):
        print(f"❌ La carpeta de imágenes '{carpeta_origen}' no existe.")
        return

    # Carpeta destino (donde se guardará el HTML)
    carpeta_destino = os.path.join(directorio_actual, "nombres")
    os.makedirs(carpeta_destino, exist_ok=True)

    # Extensiones válidas
    extensiones = (".jpg", ".jpeg", ".png", ".bmp", ".gif", ".tiff")

    # Listar imágenes
    nombres_imagenes = [f for f in os.listdir(carpeta_origen) if f.lower().endswith(extensiones)]
    if not nombres_imagenes:
        print("⚠️ No se encontraron imágenes en la carpeta de origen.")
        return

    # Guardar líneas HTML en el archivo
    archivo_txt = os.path.join(carpeta_destino, "imagenes.html")
    with open(archivo_txt, "w", encoding="utf-8") as f:
        for i, nombre in enumerate(nombres_imagenes, start=1):
            linea_html = f'<img src="fondos/{nombre}" class="active" alt="Imagen {i}">'
            f.write(linea_html + "\n")

    print(f"✅ Código HTML generado en: {archivo_txt}")
if __name__ == "__main__":
    main()
