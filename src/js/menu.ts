document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".header-menu-burger");
  const menuContent = document.querySelector(".header-menu-content");
  const menuItems = document.querySelectorAll(".menu-item-has-children");

  const removeAccents = (text: string): string => {
    return text
      .replace(/é/g, "e")
      .replace(/è/g, "e")
      .replace(/ê/g, "e")
      .replace(/ë/g, "e")
      .replace(/à/g, "a")
      .replace(/â/g, "a")
      .replace(/ä/g, "a")
      .replace(/ù/g, "u")
      .replace(/û/g, "u")
      .replace(/ü/g, "u")
      .replace(/î/g, "i")
      .replace(/ï/g, "i")
      .replace(/ô/g, "o")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c")
      .replace(/É/g, "E")
      .replace(/È/g, "E")
      .replace(/Ê/g, "E")
      .replace(/Ë/g, "E")
      .replace(/À/g, "A")
      .replace(/Â/g, "A")
      .replace(/Ä/g, "A")
      .replace(/Ù/g, "U")
      .replace(/Û/g, "U")
      .replace(/Ü/g, "U")
      .replace(/Î/g, "I")
      .replace(/Ï/g, "I")
      .replace(/Ô/g, "O")
      .replace(/Ö/g, "O")
      .replace(/Ç/g, "C");
  };

  const removeAccentOnTabletAndMobile = () => {
    const primaryMenu = document.querySelector(".primary-menu");
    if (!primaryMenu) return;

    const isTabletOrMobile = window.innerWidth < 992;

    const secondMenuItem = primaryMenu.children[1] as HTMLElement;
    if (secondMenuItem) {
      const secondMenuLink = secondMenuItem.querySelector("a");
      if (secondMenuLink) {
        const originalText = secondMenuLink.textContent || "";
        if (!secondMenuLink.dataset.originalText) {
          secondMenuLink.dataset.originalText = originalText;
        }

        if (isTabletOrMobile) {
          const textWithoutAccent = removeAccents(originalText);
          if (secondMenuLink.textContent !== textWithoutAccent) {
            secondMenuLink.textContent = textWithoutAccent;
          }
        } else {
          if (secondMenuLink.dataset.originalText) {
            secondMenuLink.textContent = secondMenuLink.dataset.originalText;
          }
        }
      }
    }

    const thirdMenuItem = primaryMenu.children[2] as HTMLElement;
    if (thirdMenuItem) {
      const thirdMenuLink = thirdMenuItem.querySelector("a");
      if (thirdMenuLink) {
        const originalText = thirdMenuLink.textContent || "";
        if (!thirdMenuLink.dataset.originalText) {
          thirdMenuLink.dataset.originalText = originalText;
        }

        if (isTabletOrMobile) {
          const textWithoutAccent = removeAccents(originalText);
          if (thirdMenuLink.textContent !== textWithoutAccent) {
            thirdMenuLink.textContent = textWithoutAccent;
          }
        } else {
          if (thirdMenuLink.dataset.originalText) {
            thirdMenuLink.textContent = thirdMenuLink.dataset.originalText;
          }
        }
      }
    }
  };

  removeAccentOnTabletAndMobile();
  window.addEventListener("resize", removeAccentOnTabletAndMobile);

  const header = document.querySelector("#header") as HTMLElement;
  if (header && window.innerWidth > 1200) {
    let lastScrollTop = 0;
    window.addEventListener(
      "scroll",
      () => {
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 50) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }
        lastScrollTop = scrollTop;
      },
      false
    );

    window.addEventListener("resize", () => {
      if (window.innerWidth <= 1200) {
        header.classList.remove("scrolled");
      }
    });
  }

  if (burger && menuContent) {
    burger.addEventListener("click", () => {
      const isActive = burger.classList.contains("active");
      burger.classList.toggle("active");
      menuContent.classList.toggle("active");

      if (window.innerWidth <= 1200) {
        if (!isActive) {
          document.body.style.overflow = "hidden";
          document.body.style.position = "fixed";
          document.body.style.width = "100%";
        } else {
          document.body.style.overflow = "";
          document.body.style.position = "";
          document.body.style.width = "";
        }
      }

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
              submenu.style.opacity = "0.8";
              submenu.style.transition = "opacity 0.8s ease-in-out";
              submenu.style.transform = "translateY(0)";
              submenu.style.transition = "transform 0.8s ease-in-out";
            }
          });
        }
      }
    });
  }

  menuItems.forEach((item) => {
    const link = item.querySelector("a");
    const submenu = item.querySelector(".sub-menu");

    if (link && submenu) {
      link.addEventListener("click", (e) => {
        if (window.innerWidth <= 1200) {
          e.preventDefault();
          const isActive = item.classList.contains("active");

          if (!isActive) {
            submenu.classList.add("active");
            item.classList.add("active");
            const submenuElement = submenu as HTMLElement;

            submenuElement.style.opacity = "0";

            setTimeout(() => {
              const submenuHeight = submenuElement.scrollHeight;

              const adjustedHeight = submenuHeight - 100;

              const primaryMenu = item.parentElement as HTMLElement | null;
              if (primaryMenu) {
                const allItems = Array.from(primaryMenu.children).filter(
                  (el): el is HTMLElement => el instanceof HTMLElement
                );
                const currentIndex = allItems.indexOf(item as HTMLElement);

                for (let i = currentIndex + 1; i < allItems.length; i++) {
                  allItems[
                    i
                  ].style.transform = `translateY(${adjustedHeight}px)`;
                }
              }

              setTimeout(() => {
                submenuElement.style.opacity = "1";
              }, 100);
            }, 10);
          } else {
            const submenuElement = submenu as HTMLElement;

            const primaryMenu = item.parentElement as HTMLElement | null;
            if (primaryMenu) {
              const allItems = Array.from(primaryMenu.children).filter(
                (el): el is HTMLElement => el instanceof HTMLElement
              );
              const currentIndex = allItems.indexOf(item as HTMLElement);

              for (let i = currentIndex + 1; i < allItems.length; i++) {
                allItems[i].style.transition = "transform 0.6s ease-in-out";
                allItems[i].style.transform = "translateY(0)";
              }
            }

            submenuElement.style.transition = "opacity 0.6s ease-in-out";
            submenuElement.style.opacity = "0";

            setTimeout(() => {
              item.classList.remove("active");
              submenu.classList.remove("active");
              if (primaryMenu) {
                const allItems = Array.from(primaryMenu.children).filter(
                  (el): el is HTMLElement => el instanceof HTMLElement
                );
                const currentIndex = allItems.indexOf(item as HTMLElement);
                for (let i = currentIndex + 1; i < allItems.length; i++) {
                  allItems[i].style.transition = "";
                }
              }
              submenuElement.style.transition = "";
            }, 300);
          }
        }
      });
    }
  });

  const primaryMenu = document.querySelector(".primary-menu");
  if (primaryMenu) {
    const secondMenuItem = primaryMenu.children[1] as HTMLElement;
    if (secondMenuItem) {
      const secondMenuLink = secondMenuItem.querySelector("a");
      if (secondMenuLink) {
        secondMenuLink.addEventListener("click", (e) => {
          if (window.innerWidth > 768) {
            e.preventDefault();
            e.stopPropagation();
          }
        });
      }
    }
  }

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

      if (window.innerWidth <= 1200) {
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.width = "";
      }

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

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && burger && menuContent) {
      burger.classList.remove("active");
      menuContent.classList.remove("active");

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
