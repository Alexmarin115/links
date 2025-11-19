/* script.js
   Versión corregida: solo JavaScript
   - Espera DOMContentLoaded
   - Evita errores si no hay .link-item
   - Implementa efecto Neón A1
*/

document.addEventListener('DOMContentLoaded', () => {
  try {
    const links = document.querySelectorAll('.link-item');

    if (!links || links.length === 0) {
      console.warn('script.js: No se encontraron elementos con la clase .link-item');
      return;
    }

    const neon = true; // true = activa efecto neón (A1)

    // Animación de aparición escalonada (si CSS no la maneja)
    links.forEach((link, index) => {
      link.style.opacity = '0';
      link.style.transform = 'translateY(20px)';
      link.style.transition = 'all 0.45s cubic-bezier(.2,.9,.2,1)';

      const delay = 120 * index;
      window.setTimeout(() => {
        link.style.opacity = '1';
        link.style.transform = 'translateY(0)';
      }, delay);

      // Hover base (movimiento)
      link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-6px) scale(1.03)';
      });
      link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0) scale(1)';
      });
    });

    // Efectos NEÓN
    if (neon) {
      links.forEach(link => {
        // Añadimos props a la transición existentes sin romperlas
        const prev = link.style.transition || '';
        if (!prev.includes('box-shadow')) {
          link.style.transition = prev + (prev ? ', ' : '') + 'box-shadow 0.25s ease, background 0.25s ease';
        }

        link.addEventListener('mouseenter', () => {
          link.style.boxShadow = '0 0 18px #00eaff, 0 0 34px #ff00ff';
          link.style.background = 'linear-gradient(90deg, rgba(0,234,255,0.12), rgba(255,0,255,0.08))';
          link.style.borderColor = 'rgba(0,234,255,0.8)';
        });

        link.addEventListener('mouseleave', () => {
          link.style.boxShadow = 'none';
          link.style.background = '';
          link.style.borderColor = '';
        });
      });

      // Efecto dinámico según posición del mouse
      links.forEach(link => {
        link.addEventListener('mousemove', (e) => {
          const rect = link.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const percent = Math.min(Math.max((x / rect.width) * 100, 0), 100);
          link.style.background = `linear-gradient(90deg, rgba(0,234,255,0.12) ${percent}%, rgba(255,0,255,0.06) ${percent}%)`;
        });

        link.addEventListener('mouseleave', () => {
          link.style.background = '';
        });
      });
    }

  } catch (err) {
    console.error('Error en script.js:', err);
  }
});
