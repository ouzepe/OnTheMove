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

    oceanImage.style.transform = `translate(${translateX}px, ${translateY}px)`;
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

    oceanImage.style.transform = `translate(${translateX}px, ${translateY}px)`;
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
