/**
 * Gestion de la mise en page pour la page "À propos"
 * Wrapper les deux paragraphes (2ème et 3ème) dans un conteneur flex
 */

document.addEventListener("DOMContentLoaded", () => {
  const aProposContent = document.querySelector(
    ".a-propos-content"
  ) as HTMLElement;

  if (!aProposContent) {
    return;
  }

  // Récupérer le 2ème et 3ème paragraphe
  const paragraphs = aProposContent.querySelectorAll("p");
  const secondParagraph = paragraphs[1];
  const thirdParagraph = paragraphs[2];

  if (!secondParagraph || !thirdParagraph) {
    return;
  }

  // Vérifier si le wrapper existe déjà
  if (
    secondParagraph.parentElement?.classList.contains("two-paragraphs-wrapper")
  ) {
    return;
  }

  // Cacher les paragraphes initialement pour éviter le flash
  secondParagraph.style.opacity = "0";
  thirdParagraph.style.opacity = "0";

  // Créer un wrapper flex
  const wrapper = document.createElement("div");
  wrapper.className = "two-paragraphs-wrapper";

  // Créer le séparateur
  const separator = document.createElement("div");
  separator.className = "two-paragraphs-separator";

  // Insérer le wrapper avant le 2ème paragraphe
  secondParagraph.parentNode?.insertBefore(wrapper, secondParagraph);

  // Déplacer les deux paragraphes et le séparateur dans le wrapper
  wrapper.appendChild(secondParagraph);
  wrapper.appendChild(separator);
  wrapper.appendChild(thirdParagraph);

  // Afficher les paragraphes après que le wrapper soit créé
  requestAnimationFrame(() => {
    secondParagraph.style.opacity = "1";
    thirdParagraph.style.opacity = "1";
  });

  // Créer un wrapper pour les 3 figures après le h6 avec la classe a-propos-partner
  const partnerHeading = aProposContent.querySelector(
    "h6.a-propos-partner"
  ) as HTMLElement;

  if (partnerHeading) {
    // Récupérer les 3 figures qui suivent le h6
    const figures: HTMLElement[] = [];
    let nextElement = partnerHeading.nextElementSibling;

    while (nextElement && figures.length < 3) {
      if (nextElement.tagName === "FIGURE") {
        figures.push(nextElement as HTMLElement);
      }
      nextElement = nextElement.nextElementSibling;
    }

    if (figures.length === 3) {
      // Vérifier si le wrapper existe déjà
      const existingWrapper = aProposContent.querySelector(
        ".a-propos-partners-wrapper"
      );
      if (existingWrapper) {
        return;
      }

      // Créer le wrapper
      const partnersWrapper = document.createElement("div");
      partnersWrapper.className = "a-propos-partners-wrapper";

      // Insérer le wrapper après le h6
      partnerHeading.parentNode?.insertBefore(
        partnersWrapper,
        partnerHeading.nextSibling
      );

      // Déplacer les figures dans le wrapper
      figures.forEach((figure) => {
        partnersWrapper.appendChild(figure);
      });
    }
  }

  // Corriger la structure des team-members-info
  // Extraire tous les .team-members-info imbriqués et les rendre enfants directs de .team-members
  const teamMembers = aProposContent.querySelector(
    ".team-members"
  ) as HTMLElement;

  if (teamMembers) {
    // Récupérer tous les .team-members-info, même ceux qui sont imbriqués
    const allTeamMembersInfo = Array.from(
      teamMembers.querySelectorAll(".team-members-info")
    ) as HTMLElement[];

    // Filtrer ceux qui ne sont pas déjà des enfants directs de .team-members
    const nestedItems = allTeamMembersInfo.filter((item) => {
      return item.parentElement !== teamMembers;
    });

    // Déplacer chaque élément imbriqué pour qu'il devienne un enfant direct
    nestedItems.forEach((item) => {
      teamMembers.appendChild(item);
    });

    // Supprimer les .team-members-info vides
    const allDirectItems = Array.from(
      teamMembers.querySelectorAll(".team-members-info")
    ) as HTMLElement[];

    allDirectItems.forEach((item) => {
      // Vérifier si l'élément est vide (pas de contenu significatif)
      const hasContent =
        item.querySelector("figure") ||
        item.querySelector("h3") ||
        item.querySelector("h4") ||
        item.querySelector("p") ||
        item.querySelector(".team-members-contact") ||
        (item.textContent && item.textContent.trim().length > 0);

      // Si l'élément est vide, le supprimer
      if (!hasContent) {
        item.remove();
      }
    });
  }
});
