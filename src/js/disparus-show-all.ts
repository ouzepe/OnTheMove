document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(
    "[data-disparus-show-all]"
  ) as HTMLButtonElement | null;

  if (!button) return;

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
});
