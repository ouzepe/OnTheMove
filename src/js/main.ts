import "../scss/style.scss";

console.log("Thème WordPress prêt 🎉");

// Menu burger
const burgerButton = document.getElementById("header-menu-burger");
const menuContent = document.getElementById("header-menu-content");

if (burgerButton && menuContent) {
  burgerButton.addEventListener("click", () => {
    burgerButton.classList.toggle("active");
    menuContent.classList.toggle("active");
    document.body.style.overflow = menuContent.classList.contains("active")
      ? "hidden"
      : "";
  });

  // Gérer les sous-menus sur mobile
  const menuItemsWithChildren = menuContent.querySelectorAll(
    ".menu-item-has-children > a"
  );
  menuItemsWithChildren.forEach((menuItem) => {
    menuItem.addEventListener("click", (e) => {
      if (window.innerWidth <= 650) {
        e.preventDefault();
        const subMenu = menuItem.nextElementSibling as HTMLElement;
        if (subMenu && subMenu.classList.contains("sub-menu")) {
          subMenu.classList.toggle("active");
        }
      }
    });
  });

  // Fermer le menu quand on clique sur un lien
  const menuLinks = menuContent.querySelectorAll("a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 650) {
        // Ne fermer que si ce n'est pas un élément avec sous-menu
        if (!link.parentElement?.classList.contains("menu-item-has-children")) {
          burgerButton.classList.remove("active");
          menuContent.classList.remove("active");
          document.body.style.overflow = "";
        }
      }
    });
  });

  // Fermer le menu quand on redimensionne la fenêtre
  window.addEventListener("resize", () => {
    if (window.innerWidth > 650) {
      burgerButton.classList.remove("active");
      menuContent.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}
