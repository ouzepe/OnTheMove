// @ts-ignore
import Swiper from "swiper";
// @ts-ignore
import { Pagination, Autoplay, EffectFade } from "swiper/modules";

// Fonction pour détecter si on est en mobile (sm)
function isMobile(): boolean {
  return window.innerWidth < 650; // Breakpoint sm
}

// Fonction pour filtrer les slides selon le format
// Supprime les slides non visibles du DOM pour que Swiper ne les compte pas
function filterSlides(
  homeSwiperElement: HTMLElement,
  hiddenSlides: HTMLElement[]
): void {
  const slides = homeSwiperElement.querySelectorAll(".swiper-slide");
  const isMobileView = isMobile();
  const wrapper = homeSwiperElement.querySelector(
    ".swiper-wrapper"
  ) as HTMLElement;

  if (!wrapper) return;

  // Remettre toutes les slides dans le DOM d'abord
  hiddenSlides.forEach((slide) => {
    if (slide.parentNode !== wrapper) {
      wrapper.appendChild(slide);
    }
  });

  // Vider le tableau des slides cachées
  hiddenSlides.length = 0;

  // Filtrer les slides
  slides.forEach((slide) => {
    const slideElement = slide as HTMLElement;
    const desktopVisible = slideElement.dataset.desktopVisible === "true";
    const mobileVisible = slideElement.dataset.mobileVisible === "true";

    // Déterminer si la slide est visible selon le format
    const isVisible = isMobileView ? mobileVisible : desktopVisible;

    if (!isVisible) {
      // Supprimer la slide du DOM et la garder en mémoire
      wrapper.removeChild(slideElement);
      hiddenSlides.push(slideElement);
    }
  });
}

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

  // Tableau pour stocker les slides cachées
  const hiddenSlides: HTMLElement[] = [];

  // Filtrer les slides selon le format d'écran
  filterSlides(homeSwiperElement, hiddenSlides);

  // Trouver l'élément de pagination
  const paginationEl = homeSwiperElement.querySelector(
    ".swiper-pagination"
  ) as HTMLElement;

  // Variable pour stocker l'instance Swiper
  let homeSwiper: any = null;

  // Fonction pour compter les slides visibles
  function countVisibleSlides(): number {
    const slides = homeSwiperElement.querySelectorAll(".swiper-slide");
    return slides.length;
  }

  // Fonction pour initialiser ou réinitialiser Swiper
  function initSwiper() {
    // Détruire l'instance existante si elle existe
    if (homeSwiper) {
      homeSwiper.destroy(true, true);
      homeSwiper = null;
    }

    // Filtrer les slides à nouveau
    filterSlides(homeSwiperElement, hiddenSlides);

    const visibleCount = countVisibleSlides();

    // S'assurer qu'en desktop/tablette, on a bien 4 slides maximum
    if (!isMobile() && visibleCount > 4) {
      // Si on a plus de 4 slides en desktop, supprimer les supplémentaires
      const slides = homeSwiperElement.querySelectorAll(".swiper-slide");
      const wrapper = homeSwiperElement.querySelector(
        ".swiper-wrapper"
      ) as HTMLElement;
      if (wrapper && slides.length > 4) {
        for (let i = 4; i < slides.length; i++) {
          const slide = slides[i] as HTMLElement;
          wrapper.removeChild(slide);
          hiddenSlides.push(slide);
        }
      }
    }

    // S'assurer qu'en mobile, on a bien 4 slides maximum (2 premières + 2 dernières)
    if (isMobile() && visibleCount > 4) {
      // Si on a plus de 4 slides en mobile, supprimer les supplémentaires
      const slides = homeSwiperElement.querySelectorAll(".swiper-slide");
      const wrapper = homeSwiperElement.querySelector(
        ".swiper-wrapper"
      ) as HTMLElement;
      if (wrapper && slides.length > 4) {
        // Garder seulement les 4 premières slides visibles (qui devraient être les 2 premières et 2 dernières)
        for (let i = 4; i < slides.length; i++) {
          const slide = slides[i] as HTMLElement;
          wrapper.removeChild(slide);
          hiddenSlides.push(slide);
        }
      }
    }

    try {
      // @ts-ignore
      homeSwiper = new Swiper(homeSwiperElement, {
        modules: [Pagination, Autoplay, EffectFade],
        effect: "fade",
        fadeEffect: {
          crossFade: true,
        },
        loop: visibleCount > 1, // Activer le loop seulement s'il y a plus d'une slide visible
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

      // Démarrer l'autoplay explicitement
      setTimeout(() => {
        if (homeSwiper && homeSwiper.autoplay) {
          homeSwiper.autoplay.start();
        }
      }, 100);
    } catch (error) {
      console.error("Carousel: Initialization error", error);
    }
  }

  // Initialiser Swiper
  initSwiper();

  // Ajouter la navigation par clic sur l'image
  const slides = homeSwiperElement.querySelectorAll(".swiper-slide");
  slides.forEach((slide) => {
    const img = slide.querySelector("img");
    if (img) {
      img.style.cursor = "pointer";
      img.addEventListener("click", () => {
        // Avancer à la slide suivante
        if (homeSwiper) {
          homeSwiper.slideNext();
        }
      });
    }
  });

  // Gérer le redimensionnement de la fenêtre
  let resizeTimeout: NodeJS.Timeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Réinitialiser Swiper avec les nouvelles slides visibles
      initSwiper();
    }, 250);
  });
});
