document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.querySelector(".wpcf7-form") as HTMLFormElement;

  if (!contactForm) {
    return;
  }

  // Trouver le bouton submit
  const submitButton = contactForm.querySelector(
    ".wpcf7-submit"
  ) as HTMLInputElement;

  if (!submitButton) {
    return;
  }

  // Wrapper le bouton et ajouter la flèche SVG à l'intérieur
  if (!submitButton.dataset.arrowAdded) {
    const parent = submitButton.parentElement;
    if (parent) {
      // Créer un wrapper pour le bouton et le SVG
      const wrapper = document.createElement("span");
      wrapper.className = "submit-button-wrapper";

      // Créer la flèche SVG
      const arrowSvg = document.createElement("span");
      arrowSvg.className = "submit-arrow";
      arrowSvg.innerHTML = `<svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 12V0L15 6L0 12ZM1.5 9.77084L10.9583 6L1.5 2.22917V4.5L6 6L1.5 7.5V9.77084Z" fill="#4a0b24"/></svg>`;

      // Déplacer le bouton dans le wrapper
      parent.insertBefore(wrapper, submitButton);
      wrapper.appendChild(submitButton);
      wrapper.appendChild(arrowSvg);

      submitButton.dataset.arrowAdded = "true";
    }
  }

  // Trouver tous les champs requis (avec aria-required="true" ou class wpcf7-validates-as-required)
  const requiredFields = contactForm.querySelectorAll(
    'input[aria-required="true"], textarea[aria-required="true"]'
  ) as NodeListOf<HTMLInputElement | HTMLTextAreaElement>;

  // Fonction pour vérifier si tous les champs requis sont remplis
  function checkRequiredFields(): boolean {
    let allFilled = true;

    requiredFields.forEach((field) => {
      const value = field.value.trim();
      if (!value) {
        allFilled = false;
      }
    });

    return allFilled;
  }

  // Fonction pour mettre à jour l'état du bouton
  function updateSubmitButton() {
    const allFilled = checkRequiredFields();
    submitButton.disabled = !allFilled;
  }

  // Écouter les changements sur tous les champs requis
  requiredFields.forEach((field) => {
    field.addEventListener("input", updateSubmitButton);
    field.addEventListener("change", updateSubmitButton);
  });

  // Vérifier l'état initial
  updateSubmitButton();
});
