// Carousel for frontiere-franco-britannique page
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(
    ".frontiere-franco-britannique-sixth-group-carousel"
  );

  if (!carousel) return;

  const leftArrow = carousel.querySelector(
    ".carousel-arrow-left"
  ) as HTMLButtonElement;
  const rightArrow = carousel.querySelector(
    ".carousel-arrow-right"
  ) as HTMLButtonElement;
  const carouselImages = carousel.querySelector(
    ".carousel-images"
  ) as HTMLElement;
  const slides = carousel.querySelectorAll(
    ".carousel-slide"
  ) as NodeListOf<HTMLElement>;

  if (!leftArrow || !rightArrow || !carouselImages || slides.length === 0)
    return;

  let currentIndex = 0;

  const updateCarousel = () => {
    // Calculate translateX based on fixed widths BEFORE updating classes
    // Check screen size
    const windowWidth = window.innerWidth;
    let inactiveWidth = 400; // Desktop default
    let gap = 20; // Desktop default

    if (windowWidth <= 576) {
      // sm breakpoint
      inactiveWidth = 200;
      gap = 10;
    } else if (windowWidth <= 768) {
      // md breakpoint
      inactiveWidth = 300;
      gap = 15;
    }

    // Calculate translateX: sum of all previous inactive slides
    let translateX = 0;
    for (let i = 0; i < currentIndex; i++) {
      translateX += inactiveWidth + gap;
    }

    // Update active class
    slides.forEach((slide, index) => {
      slide.classList.remove("active");
      if (index === currentIndex) {
        slide.classList.add("active");
      }
    });

    // Apply transform
    carouselImages.style.transform = `translateX(-${translateX}px)`;

    // Update arrows state
    leftArrow.disabled = currentIndex === 0;
    rightArrow.disabled = currentIndex === slides.length - 1;
  };

  rightArrow.addEventListener("click", () => {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  leftArrow.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  // Initial state
  updateCarousel();

  // Update on window resize
  window.addEventListener("resize", updateCarousel);
});
