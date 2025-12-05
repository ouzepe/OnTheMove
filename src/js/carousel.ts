// @ts-ignore
import Swiper from "swiper";
// @ts-ignore
import { Pagination, Autoplay, EffectFade } from "swiper/modules";

document.addEventListener("DOMContentLoaded", function () {
  // Initialiser le carousel pour single.php (home-swiper)
  const homeSwiperElement = document.querySelector(
    ".home-swiper"
  ) as HTMLElement;

  if (!homeSwiperElement) {
    return;
  }

  // Empêcher le scroll de la page quand le carousel est affiché
  document.body.style.overflow = "hidden";
  document.body.style.position = "fixed";
  document.body.style.width = "100%";
  document.body.style.height = "100%";
  document.documentElement.style.overflow = "hidden";
  document.documentElement.style.height = "100%";

  // Trouver l'élément de pagination
  const paginationEl = homeSwiperElement.querySelector(
    ".swiper-pagination"
  ) as HTMLElement;

  try {
    // @ts-ignore
    const homeSwiper = new Swiper(homeSwiperElement, {
      modules: [Pagination, Autoplay, EffectFade],
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
        waitForTransition: true,
        stopOnLastSlide: false,
      },
      speed: 1000,
      slidesPerView: 1,
      spaceBetween: 0,
      pagination: {
        el: paginationEl || ".swiper-pagination",
        clickable: true,
        type: "bullets",
      },
      allowTouchMove: true,
      keyboard: {
        enabled: true,
      },
      mousewheel: false,
    });

    // Ajouter la navigation par clic sur l'image
    const slides = homeSwiperElement.querySelectorAll(".swiper-slide");
    slides.forEach((slide, index) => {
      const img = slide.querySelector("img");
      if (img) {
        img.style.cursor = "pointer";
        img.addEventListener("click", () => {
          // Avancer à la slide suivante
          homeSwiper.slideNext();
        });
      }
    });

    // Démarrer l'autoplay explicitement
    setTimeout(() => {
      if (homeSwiper && homeSwiper.autoplay) {
        homeSwiper.autoplay.start();
      }
    }, 100);
  } catch (error) {
    console.error("Carousel: Initialization error", error);
  }
});
