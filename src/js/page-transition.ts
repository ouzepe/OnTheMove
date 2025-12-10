/**
 * Gestion des transitions de page avec GSAP
 * Intercepte les clics sur les liens et ajoute une animation de transition
 */

// Déclaration globale pour GSAP
declare const gsap: any;

class PageTransition {
  private overlay: HTMLElement | null = null;
  private logo: HTMLElement | null = null;
  private logoPath: string = "";
  private isTransitioning: boolean = false;

  constructor() {
    // Vérifier que GSAP est disponible
    if (typeof gsap === "undefined") {
      console.error(
        "GSAP n'est pas chargé. Veuillez vérifier le chargement de GSAP."
      );
      return;
    }

    this.init();
  }

  private init(): void {
    // Récupérer le chemin du logo depuis l'attribut data-template-dir du body
    const body = document.body;
    const templateDir = body.getAttribute("data-template-dir");
    this.logoPath = templateDir
      ? `${templateDir}/src/assets/Carousel-logo.svg`
      : "";

    // Créer l'overlay et le logo
    this.createOverlay();

    // Intercepter tous les clics sur les liens internes
    document.addEventListener("click", (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a") as HTMLAnchorElement;

      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      // Ignorer les liens externes, mailto, tel, etc.
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

      // Ignorer si déjà en transition
      if (this.isTransitioning) {
        e.preventDefault();
        return;
      }

      // Empêcher la navigation par défaut
      e.preventDefault();

      // Démarrer la transition
      this.startTransition(href);
    });
  }

  private createOverlay(): void {
    // Créer l'overlay avec le logo
    this.overlay = document.createElement("div");
    this.overlay.className = "page-transition-overlay";

    // Créer le logo
    const logoContainer = document.createElement("div");
    logoContainer.className = "page-transition-logo";
    logoContainer.innerHTML = `
      <picture>
        <img src="${this.logoPath}" alt="OnTheMove Logo" loading="eager">
      </picture>
    `;

    this.overlay.appendChild(logoContainer);
    document.body.appendChild(this.overlay);

    // Récupérer l'élément logo
    this.logo = logoContainer;

    // Initialiser l'overlay et le logo comme invisibles
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

    // Précharger la page en arrière-plan pendant l'animation
    this.preloadPage(url);

    // Créer une timeline GSAP pour l'animation
    const tl = gsap.timeline();

    // Faire apparaître l'overlay et le logo en même temps
    tl.to(
      [this.overlay, this.logo],
      {
        opacity: 1,
        visibility: "visible",
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
      },
      0 // Démarrage simultané
    );

    // Naviguer immédiatement après l'apparition
    // L'overlay masque le chargement de la page
    tl.call(() => {
      window.location.href = url;
    });

    // Attendre suffisamment longtemps pour que la page se charge
    // L'overlay reste visible pendant ce temps
    tl.to({}, { duration: 3.5 });

    // Faire disparaître l'overlay et le logo en même temps de manière très douce
    // La nouvelle page devrait déjà être chargée
    tl.to([this.overlay, this.logo], {
      opacity: 0,
      visibility: "hidden",
      scale: 0.98,
      duration: 1.8,
      ease: "power1.inOut",
      onComplete: () => {
        // S'assurer que l'overlay est complètement retiré à la fin
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
    // Précharger la page en arrière-plan pour un chargement plus rapide
    // Utiliser fetch pour précharger le contenu
    fetch(url, {
      method: "GET",
      cache: "default",
    })
      .then(() => {
        // La page est préchargée, elle sera plus rapide à charger
        console.log("Page préchargée:", url);
      })
      .catch((error) => {
        // En cas d'erreur, on continue quand même
        console.warn("Erreur de préchargement:", error);
      });
  }
}

// Initialiser la transition de page quand le DOM et GSAP sont prêts
function initPageTransition() {
  if (typeof gsap === "undefined") {
    // Attendre que GSAP soit chargé
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

// Démarrer l'initialisation
if (document.readyState === "complete") {
  initPageTransition();
} else {
  window.addEventListener("load", initPageTransition, { once: true });
  if (document.readyState !== "loading") {
    initPageTransition();
  }
}
