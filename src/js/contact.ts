document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.querySelector(".wpcf7-form") as HTMLFormElement;

  if (!contactForm) {
    return;
  }

  const submitButton = contactForm.querySelector(
    ".wpcf7-submit"
  ) as HTMLInputElement;

  if (!submitButton) {
    return;
  }

  if (!submitButton.dataset.arrowAdded) {
    const parent = submitButton.parentElement;
    if (parent) {
      const wrapper = document.createElement("span");
      wrapper.className = "submit-button-wrapper";

      const arrowSvg = document.createElement("span");
      arrowSvg.className = "submit-arrow";
      arrowSvg.innerHTML = `<svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 12V0L15 6L0 12ZM1.5 9.77084L10.9583 6L1.5 2.22917V4.5L6 6L1.5 7.5V9.77084Z" fill="#4a0b24"/></svg>`;

      parent.insertBefore(wrapper, submitButton);
      wrapper.appendChild(submitButton);
      wrapper.appendChild(arrowSvg);

      submitButton.dataset.arrowAdded = "true";
    }
  }

  const requiredFields = contactForm.querySelectorAll(
    'input[aria-required="true"], textarea[aria-required="true"]'
  ) as NodeListOf<HTMLInputElement | HTMLTextAreaElement>;

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

  function updateSubmitButton() {
    const allFilled = checkRequiredFields();
    submitButton.disabled = !allFilled;
  }

  requiredFields.forEach((field) => {
    field.addEventListener("input", updateSubmitButton);
    field.addEventListener("change", updateSubmitButton);
  });

  updateSubmitButton();
});
