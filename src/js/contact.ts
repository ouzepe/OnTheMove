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
