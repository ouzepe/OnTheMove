function setupZoomEffect() {
  const pressContent = document.querySelector(".press-content") as HTMLElement;

  if (!pressContent) {
    return;
  }

  if (pressContent.querySelector(".zoom-zone")) {
    return;
  }

  const allImages = pressContent.querySelectorAll("img");

  if (allImages.length === 0) {
    return;
  }

  const firstImage = allImages[0] as HTMLImageElement;

  let imageContainer: HTMLElement | null = firstImage.parentElement;

  while (imageContainer && imageContainer !== pressContent) {
    const tagName = imageContainer.tagName;
    if (
      tagName === "FIGURE" ||
      tagName === "P" ||
      (tagName === "DIV" && imageContainer.querySelector("img"))
    ) {
      break;
    }
    imageContainer = imageContainer.parentElement;
  }

  if (!imageContainer || imageContainer === pressContent) {
    const wrapper = document.createElement("div");
    wrapper.className = "zoom-zone";
    firstImage.parentNode?.insertBefore(wrapper, firstImage);
    wrapper.appendChild(firstImage);
  } else {
    if (imageContainer.classList.contains("zoom-zone")) {
      return;
    }
    imageContainer.classList.add("zoom-zone");
  }
}

document.addEventListener("DOMContentLoaded", setupZoomEffect);

setTimeout(setupZoomEffect, 500);
