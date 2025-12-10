declare const gsap: any;

class PageTransition {
  private overlay: HTMLElement | null = null;
  private logo: HTMLElement | null = null;
  private logoPath: string = "";
  private isTransitioning: boolean = false;

  constructor() {
    if (typeof gsap === "undefined") {
      console.error(
        "GSAP n'est pas chargé. Veuillez vérifier le chargement de GSAP."
      );
      return;
    }

    this.init();
  }

  private init(): void {
    const body = document.body;
    const templateDir = body.getAttribute("data-template-dir");
    this.logoPath = templateDir
      ? `${templateDir}/src/assets/Carousel-logo.svg`
      : "";

    this.createOverlay();

    document.addEventListener("click", (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a") as HTMLAnchorElement;

      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      if (
        (href.startsWith("http") && !href.includes(window.location.hostname)) ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#") ||
        link.hasAttribute("target") ||
        link.hasAttribute("download")
      ) {
        return;
      }

      if (this.isTransitioning) {
        e.preventDefault();
        return;
      }

      e.preventDefault();

      this.startTransition(href);
    });
  }

  private createOverlay(): void {
    this.overlay = document.createElement("div");
    this.overlay.className = "page-transition-overlay";

    const logoContainer = document.createElement("div");
    logoContainer.className = "page-transition-logo";
    logoContainer.innerHTML = `
      <picture>
        <img src="${this.logoPath}" alt="OnTheMove Logo" loading="eager">
      </picture>
    `;

    this.overlay.appendChild(logoContainer);
    document.body.appendChild(this.overlay);

    this.logo = logoContainer;

    gsap.set(this.overlay, {
      opacity: 0,
      visibility: "hidden",
    });

    gsap.set(this.logo, {
      opacity: 0,
      scale: 0.8,
    });
  }

  private startTransition(url: string): void {
    if (this.isTransitioning || !this.overlay || !this.logo) return;

    this.isTransitioning = true;

    this.preloadPage(url);

    const tl = gsap.timeline();

    tl.to(
      [this.overlay, this.logo],
      {
        opacity: 1,
        visibility: "visible",
        scale: 1,
        duration: 1.8,
        ease: "power1.inOut",
      },
      0
    );

    tl.call(() => {
      window.location.href = url;
    });

    tl.to({}, { duration: 3.5 });

    tl.to([this.overlay, this.logo], {
      opacity: 0,
      visibility: "hidden",
      scale: 0.98,
      duration: 1.8,
      ease: "power1.inOut",
      onComplete: () => {
        if (this.overlay) {
          gsap.set(this.overlay, {
            opacity: 0,
            visibility: "hidden",
            clearProps: "all",
          });
        }
        if (this.logo) {
          gsap.set(this.logo, {
            opacity: 0,
            visibility: "hidden",
            clearProps: "all",
          });
        }
      },
    });
  }

  private preloadPage(url: string): void {
    fetch(url, {
      method: "GET",
      cache: "default",
    })
      .then(() => {
        console.log("Page préchargée:", url);
      })
      .catch((error) => {
        console.warn("Erreur de préchargement:", error);
      });
  }
}

function initPageTransition() {
  if (typeof gsap === "undefined") {
    setTimeout(initPageTransition, 100);
    return;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPageTransition, {
      once: true,
    });
  } else {
    new PageTransition();
  }
}

if (document.readyState === "complete") {
  initPageTransition();
} else {
  window.addEventListener("load", initPageTransition, { once: true });
  if (document.readyState !== "loading") {
    initPageTransition();
  }
}
