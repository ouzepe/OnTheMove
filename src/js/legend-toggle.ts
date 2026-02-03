document.addEventListener("DOMContentLoaded", () => {
  const legendContainer = document.querySelector(".map-legend");
  const toggleButton = document.querySelector(".legend-scroll-indicator");

  if (!legendContainer || !toggleButton) {
    console.log("Legend elements not found");
    return;
  }

  console.log("Legend toggle initialized");

  // Only enable toggle functionality on mobile
  const isMobile = () => window.innerWidth <= 576;

  if (isMobile()) {
    // Start collapsed on mobile
    legendContainer.classList.remove("expanded");
    toggleButton.classList.remove("expanded");
  }

  toggleButton.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Button clicked, isMobile:", isMobile());

    if (!isMobile()) return; // Only work on mobile

    const isExpanded = legendContainer.classList.toggle("expanded");
    toggleButton.classList.toggle("expanded");

    console.log("Toggled expanded:", isExpanded);
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
