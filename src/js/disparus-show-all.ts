document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(
    "[data-disparus-show-all]"
  ) as HTMLButtonElement | null;

  const drawer = document.querySelector(
    "#disparus-drawer"
  ) as HTMLElement | null;
  const drawerContent = document.querySelector(
    "#disparus-drawer-content"
  ) as HTMLElement | null;
  const drawerClose = document.querySelector(
    ".disparus-drawer-close"
  ) as HTMLButtonElement | null;

  const closeDrawer = () => {
    if (!drawer) return;
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
  };

  const updateSeparators = () => {
    const items = Array.from(
      document.querySelectorAll(".disparus-article")
    ) as HTMLElement[];
    const visible = items.filter(
      (item) => !item.classList.contains("is-hidden")
    );

    visible.forEach((item) => item.classList.remove("has-separator"));

    const isSm = window.matchMedia("(max-width: 767px)").matches;
    const columns = isSm ? 2 : 4;

    for (let i = 0; i < visible.length; i += 1) {
      const item = visible[i];
      const next = visible[i + 1];
      if (i % columns !== columns - 1 && next) {
        item.classList.add("has-separator");
      }
    }
  };

  updateSeparators();

  if (button) {
    button.addEventListener("click", () => {
      closeDrawer();

      const items = document.querySelectorAll(
        ".disparus-article"
      ) as NodeListOf<HTMLElement>;

      const isExpanded = button.getAttribute("data-expanded") === "true";

      items.forEach((item, index) => {
        if (isExpanded && index >= 8) {
          item.classList.add("is-hidden");
        } else if (!isExpanded && index >= 8) {
          item.classList.remove("is-hidden");
        }
      });

      button.setAttribute("data-expanded", isExpanded ? "false" : "true");
      updateSeparators();
    });
  }

  if (drawerContent) {
    document.addEventListener("click", (event) => {
      const target = event.target as HTMLElement | null;

      // Fermer le drawer si clic en dehors (pas sur un lien biographie ni dans le drawer)
      if (
        drawer?.classList.contains("open") &&
        !target?.closest(".disparus-drawer") &&
        !target?.closest(".disparus-link")
      ) {
        closeDrawer();
        return;
      }

      const link = target?.closest(".disparus-link") as HTMLElement | null;
      if (!link) return;

      event.preventDefault();
      if (!drawer) return;

      const article = link.closest(".disparus-article") as HTMLElement | null;
      const data = article?.querySelector(
        ".disparus-drawer-data"
      ) as HTMLElement | null;
      const title =
        data?.dataset.drawerTitle ||
        article?.querySelector(".disparus-title")?.textContent ||
        "";
      const image =
        data?.querySelector(".disparus-drawer-image")?.outerHTML || "";
      const body =
        data?.querySelector(".disparus-drawer-body")?.innerHTML || "";

      drawerContent.innerHTML = `${image}<h2 class="disparus-drawer-title">${title}</h2>${body}`;
      drawerContent
        .querySelectorAll(".disparus-drawer-divider")
        .forEach((divider) => divider.remove());
      const titleEl = drawerContent.querySelector(".disparus-drawer-title");
      if (titleEl) {
        const divider = document.createElement("div");
        divider.className = "disparus-drawer-divider";
        titleEl.insertAdjacentElement("afterend", divider);
      }
      const paragraphs = drawerContent.querySelectorAll("p");
      if (paragraphs.length >= 1) {
        const divider = document.createElement("div");
        divider.className = "disparus-drawer-divider";
        paragraphs[0].insertAdjacentElement("afterend", divider);
      }
      if (paragraphs.length >= 2) {
        const divider = document.createElement("div");
        divider.className = "disparus-drawer-divider";
        paragraphs[1].insertAdjacentElement("afterend", divider);
      }
      drawer.classList.add("open");
      drawer.setAttribute("aria-hidden", "false");
    });

    if (drawerClose) {
      drawerClose.addEventListener("click", closeDrawer);
    }
  }
});
