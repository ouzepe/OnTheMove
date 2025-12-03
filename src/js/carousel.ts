// @ts-ignore
import Swiper from "swiper";
// @ts-ignore
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

document.addEventListener("DOMContentLoaded", function () {
  const swiperElement = document.querySelector(".home-swiper") as HTMLElement;

  if (swiperElement) {
    // @ts-ignore
    const swiper = new Swiper(".home-swiper", {
      modules: [Pagination],
      direction: "horizontal",
      loop: false,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      allowTouchMove: false,
      keyboard: false,
      mousewheel: false,
    });
  }
});
