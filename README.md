# SMAA - Landing Page

Esta es la página de presentación para **Servicios de Manufactura Avanzada y Automatización (SMAA)**, diseñada con un tema industrial y detalles patrióticos mexicanos. 

## Características
- **Diseño Responsivo**: Adaptable a dispositivos móviles y computadoras.
- **Tema Visual**: Colores institucionales y nacionales (Verde, Blanco, Rojo) con acentos industriales.
- **Galerías de servicios**: Navegación con flechas, teclado o desplazamiento táctil, con las piezas completas en el encuadre.
- **Certificaciones próximas**: Sección de Pilz México y ROSS Controls, con estado de espera de los certificados y enlaces oficiales.

## ¿Cómo actualizar las imágenes?
1. Conserva las fotografías originales en `images/` y guarda las versiones retocadas y optimizadas en `images/actualizadas/` como WebP. Las nuevas fotos de maquinaria están en `maquinaria/actualizada/`.
2. Actualiza la ruta, el texto alternativo y las dimensiones de la imagen en `index.html` y `index-en.html`. Las galerías usan las imágenes incluidas en esos archivos; no consultan la API de GitHub.
3. Incluye cada imagen una sola vez dentro de su `gallery-track`. Al agregar o quitar imágenes, actualiza también el contador inicial del HTML; JavaScript lo mantiene durante la navegación.

## Instrucciones para publicar en GitHub Pages
Si deseas que esta página esté en línea gratis:
1. Sube todos estos archivos a tu repositorio `https://github.com/ElEduardoCR/SMAA`.
2. En GitHub, ve a **Settings** > **Pages** (en la barra lateral izquierda).
3. Bajo **Build and deployment** -> **Source**, selecciona `Deploy from a branch`.
4. En **Branch**, selecciona `main` y `/ (root)`, luego haz clic en **Save**.
5. En unos minutos, tu sitio web estará en vivo (usualmente en `https://ElEduardoCR.github.io/SMAA/`).

¡Hecho con orgullo en México! 🇲🇽
