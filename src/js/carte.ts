document.addEventListener("DOMContentLoaded", function () {
  const oceanImage = document.querySelector(
    ".la-carte-ocean img"
  ) as HTMLImageElement;

  if (!oceanImage) {
    return;
  }

  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let currentY = 0;
  let translateX = 0;
  let translateY = 0;
  let scale = 1;

  // Calculer le zoom initial pour que l'image remplisse l'écran
  function calculateInitialZoom() {
    const img = oceanImage;
    const container = img.parentElement;

    if (!container) return;

    // Attendre que l'image soit chargée
    if (img.complete) {
      setInitialZoom();
    } else {
      img.addEventListener("load", setInitialZoom);
    }
  }

  function setInitialZoom() {
    const img = oceanImage;
    const container = img.parentElement;

    if (!container) return;

    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    const imgWidth = img.naturalWidth || img.width;
    const imgHeight = img.naturalHeight || img.height;

    if (imgWidth && imgHeight) {
      // Calculer le zoom pour remplir l'écran (prendre le plus grand ratio)
      const scaleX = containerWidth / imgWidth;
      const scaleY = containerHeight / imgHeight;
      scale = Math.max(scaleX, scaleY) * 1.1; // 1.1 pour avoir un peu de zoom supplémentaire

      // Centrer l'image initialement
      currentX = 0;
      currentY = 0;
      translateX = 0;
      translateY = 0;

      // Appliquer le zoom et la position initiale
      img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
      img.style.transition = "transform 0.3s ease";
    }
  }

  // Calculer le zoom initial au chargement
  calculateInitialZoom();

  // Recalculer le zoom au redimensionnement de la fenêtre
  window.addEventListener("resize", () => {
    calculateInitialZoom();
  });

  // Gérer le début du drag (mousedown)
  oceanImage.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    oceanImage.style.cursor = "grabbing";
    e.preventDefault();
  });

  // Gérer le mouvement de la souris (mousemove)
  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    translateX = currentX + deltaX;
    translateY = currentY + deltaY;

    oceanImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    oceanImage.style.transition = "none"; // Désactiver la transition pendant le drag
  });

  // Gérer la fin du drag (mouseup)
  document.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      currentX = translateX;
      currentY = translateY;
      oceanImage.style.cursor = "grab";
      oceanImage.style.transition = "transform 0.3s ease"; // Réactiver la transition
    }
  });

  // Gérer le survol pour changer le curseur
  oceanImage.addEventListener("mouseenter", () => {
    if (!isDragging) {
      oceanImage.style.cursor = "grab";
    }
  });

  oceanImage.addEventListener("mouseleave", () => {
    if (!isDragging) {
      oceanImage.style.cursor = "default";
    }
  });

  // Support tactile (touch events) pour mobile
  oceanImage.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    e.preventDefault();
  });

  document.addEventListener("touchmove", (e) => {
    if (!isDragging) return;

    const deltaX = e.touches[0].clientX - startX;
    const deltaY = e.touches[0].clientY - startY;
    translateX = currentX + deltaX;
    translateY = currentY + deltaY;

    oceanImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    oceanImage.style.transition = "none";
    e.preventDefault();
  });

  document.addEventListener("touchend", () => {
    if (isDragging) {
      isDragging = false;
      currentX = translateX;
      currentY = translateY;
      oceanImage.style.transition = "transform 0.3s ease";
    }
  });
});
