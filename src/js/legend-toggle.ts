document.addEventListener("DOMContentLoaded", () => {
  const legendContainer = document.querySelector(".map-legend");
  const toggleButton = document.querySelector(".legend-scroll-indicator");

  if (!legendContainer || !toggleButton) {
    return;
  }

  // Only enable toggle functionality on mobile
  const isMobile = () => window.innerWidth <= 576;

  if (isMobile()) {
    // Start collapsed on mobile
    legendContainer.classList.remove("expanded");
    toggleButton.classList.remove("expanded");
  }

  toggleButton.addEventListener("click", (e) => {
    e.preventDefault();

    if (!isMobile()) return; // Only work on mobile

    const isExpanded = legendContainer.classList.toggle("expanded");
    toggleButton.classList.toggle("expanded");
  });

  // Handle window resize
  window.addEventListener("resize", () => {
    if (!isMobile()) {
      // Reset on desktop
      legendContainer.classList.remove("expanded");
      toggleButton.classList.remove("expanded");
    }
  });
});
