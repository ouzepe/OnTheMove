// Menu burger functionality
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".header-menu-burger");
  const menuContent = document.querySelector(".header-menu-content");
  const menuItems = document.querySelectorAll(".menu-item-has-children");

  // Toggle burger menu
  if (burger && menuContent) {
    burger.addEventListener("click", () => {
      const isActive = burger.classList.contains("active");
      burger.classList.toggle("active");
      menuContent.classList.toggle("active");

      // Bloquer le scroll du body quand le menu est ouvert (mobile/tablette uniquement)
      if (window.innerWidth <= 1200) {
        if (!isActive) {
          // Menu s'ouvre : bloquer le scroll du body
          document.body.style.overflow = "hidden";
          document.body.style.position = "fixed";
          document.body.style.width = "100%";
        } else {
          // Menu se ferme : restaurer le scroll du body
          document.body.style.overflow = "";
          document.body.style.position = "";
          document.body.style.width = "";
        }
      }

      // Si on ferme le menu, réinitialiser tous les transforms et opacités
      if (isActive) {
        const primaryMenu = document.querySelector(".primary-menu");
        if (primaryMenu) {
          const allItems = Array.from(primaryMenu.children).filter(
            (el): el is HTMLElement => el instanceof HTMLElement
          );
          allItems.forEach((item) => {
            item.style.transform = "translateY(0)";
            const submenu = item.querySelector(".sub-menu") as HTMLElement;
            if (submenu) {
              submenu.style.opacity = "0";
            }
          });
        }
      }
    });
  }

  // Toggle submenu on mobile
  menuItems.forEach((item) => {
    const link = item.querySelector("a");
    const submenu = item.querySelector(".sub-menu");

    if (link && submenu) {
      link.addEventListener("click", (e) => {
        // Only prevent default and toggle on mobile
        if (window.innerWidth <= 1200) {
          e.preventDefault();
          const isActive = item.classList.contains("active");

          // Calculer la hauteur du sous-menu
          if (!isActive) {
            // Ouvrir le sous-menu pour calculer sa hauteur (mais invisible au début)
            submenu.classList.add("active");
            item.classList.add("active");
            const submenuElement = submenu as HTMLElement;

            // Commencer avec opacité 0
            submenuElement.style.opacity = "0";

            // Attendre un court instant pour que le DOM se mette à jour
            setTimeout(() => {
              const submenuHeight = submenuElement.scrollHeight;

              // Réduire l'espace en soustrayant une partie de la hauteur
              // Le padding-top de 5px dans le CSS + la réduction créera un espace minimal
              const adjustedHeight = submenuHeight - 100;

              // Faire descendre les éléments suivants
              const primaryMenu = item.parentElement as HTMLElement | null;
              if (primaryMenu) {
                const allItems = Array.from(primaryMenu.children).filter(
                  (el): el is HTMLElement => el instanceof HTMLElement
                );
                const currentIndex = allItems.indexOf(item as HTMLElement);

                // Appliquer le transform aux éléments suivants (index 2 et plus)
                for (let i = currentIndex + 1; i < allItems.length; i++) {
                  allItems[
                    i
                  ].style.transform = `translateY(${adjustedHeight}px)`;
                }
              }

              // Faire apparaître le sous-menu avec opacité après le début de l'animation
              setTimeout(() => {
                submenuElement.style.opacity = "1";
              }, 100);
            }, 10);
          } else {
            // Fermer le sous-menu et réinitialiser les transforms
            const submenuElement = submenu as HTMLElement;
            submenuElement.style.opacity = "0";

            // Attendre la fin de l'animation d'opacité avant de masquer
            setTimeout(() => {
              item.classList.remove("active");
              submenu.classList.remove("active");
            }, 300);

            const primaryMenu = item.parentElement as HTMLElement | null;
            if (primaryMenu) {
              const allItems = Array.from(primaryMenu.children).filter(
                (el): el is HTMLElement => el instanceof HTMLElement
              );
              const currentIndex = allItems.indexOf(item as HTMLElement);

              // Réinitialiser le transform des éléments suivants
              for (let i = currentIndex + 1; i < allItems.length; i++) {
                allItems[i].style.transform = "translateY(0)";
              }
            }
          }
        }
      });
    }
  });

  // Empêcher le clic sur "Les territoires d'enquête" (2ème élément du menu) uniquement sur desktop
  const primaryMenu = document.querySelector(".primary-menu");
  if (primaryMenu) {
    const secondMenuItem = primaryMenu.children[1] as HTMLElement; // Index 1 = 2ème élément
    if (secondMenuItem) {
      const secondMenuLink = secondMenuItem.querySelector("a");
      if (secondMenuLink) {
        secondMenuLink.addEventListener("click", (e) => {
          // Sur desktop uniquement, empêcher le clic
          // Sur mobile/tablette, laisser le comportement par défaut pour afficher les sous-menus
          if (window.innerWidth > 768) {
            e.preventDefault();
            e.stopPropagation();
          }
        });
      }
    }
  }

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (
      burger &&
      menuContent &&
      !target.closest(".header-menu-burger") &&
      !target.closest(".header-menu-content")
    ) {
      burger.classList.remove("active");
      menuContent.classList.remove("active");

      // Restaurer le scroll du body
      if (window.innerWidth <= 1200) {
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.width = "";
      }

      // Réinitialiser tous les transforms et opacités
      const primaryMenu = document.querySelector(".primary-menu");
      if (primaryMenu) {
        const allItems = Array.from(primaryMenu.children).filter(
          (el): el is HTMLElement => el instanceof HTMLElement
        );
        allItems.forEach((item) => {
          item.style.transform = "translateY(0)";
          const submenu = item.querySelector(".sub-menu") as HTMLElement;
          if (submenu) {
            submenu.style.opacity = "0";
          }
        });
      }
    }
  });

  // Close menu on window resize if switching to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && burger && menuContent) {
      burger.classList.remove("active");
      menuContent.classList.remove("active");

      // Restaurer le scroll du body
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";

      menuItems.forEach((item) => {
        const menuItem = item as HTMLElement;
        menuItem.classList.remove("active");
        menuItem.style.transform = "translateY(0)";
        const submenu = menuItem.querySelector(".sub-menu") as HTMLElement;
        if (submenu) {
          submenu.classList.remove("active");
          submenu.style.opacity = "0";
        }
      });

      // Réinitialiser tous les transforms
      const primaryMenu = document.querySelector(".primary-menu");
      if (primaryMenu) {
        const allItems = Array.from(primaryMenu.children).filter(
          (el): el is HTMLElement => el instanceof HTMLElement
        );
        allItems.forEach((item) => {
          item.style.transform = "translateY(0)";
        });
      }
    }
  });
});
