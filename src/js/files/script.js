// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";



  if (window.matchMedia("(min-width: 991.98px)").matches) {
    const parallax = document.querySelector(".parallax");
    const promo = document.querySelector(".promo");
  
    window.addEventListener("scroll", () => {
      let value = window.scrollY;

      parallax.style.backgroundPosition = `0 -${value * 0.5}px`;
      promo.style.top = `-${value * 0.2}px`;
    })
  } else {
    /* the viewport is less than 400 pixels wide */
  }



