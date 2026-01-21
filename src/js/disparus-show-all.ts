document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(
    "[data-disparus-show-all]"
  ) as HTMLButtonElement | null;

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

  const drawer = document.querySelector(
    "#disparus-drawer"
  ) as HTMLElement | null;
  const drawerTitle = document.querySelector(
    "#disparus-drawer-title"
  ) as HTMLElement | null;
  const drawerContent = document.querySelector(
    "#disparus-drawer-content"
  ) as HTMLElement | null;
  const drawerClose = document.querySelector(
    ".disparus-drawer-close"
  ) as HTMLButtonElement | null;

  if (drawer && drawerTitle && drawerContent) {
    const links = document.querySelectorAll(
      ".disparus-link"
    ) as NodeListOf<HTMLAnchorElement>;

    links.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const article = link.closest(".disparus-article") as HTMLElement | null;
        const data = article?.querySelector(
          ".disparus-drawer-data"
        ) as HTMLElement | null;
        const title =
          data?.dataset.drawerTitle ||
          article?.querySelector(".disparus-title")?.textContent ||
          "";
        const body =
          data?.querySelector(".disparus-drawer-body")?.innerHTML || "";

        drawerTitle.textContent = title;
        drawerContent.innerHTML = body;
        drawer.classList.add("open");
        drawer.setAttribute("aria-hidden", "false");
      });
    });

    if (drawerClose) {
      drawerClose.addEventListener("click", () => {
        drawer.classList.remove("open");
        drawer.setAttribute("aria-hidden", "true");
      });
    }
  }
});
