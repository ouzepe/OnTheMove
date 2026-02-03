// Style les boutons play de Presto Player après leur chargement
document.addEventListener("DOMContentLoaded", () => {
  // Fonction pour appliquer les styles au bouton play
  const stylePlayButton = () => {
    // Récupère tous les composants presto-player
    const prestoPlayers = document.querySelectorAll("presto-player");

    prestoPlayers.forEach((player) => {
      // Accède au shadow root
      const shadowRoot = player.shadowRoot;
      if (!shadowRoot) return;

      // Trouve le bouton play dans le shadow DOM
      const playButton = shadowRoot.querySelector(
        ".plyr__control--overlaid, button[data-plyr='play']"
      ) as HTMLElement;

      if (playButton) {
        // Applique les styles
        playButton.style.backgroundColor = "#4a0b24";
        playButton.style.background = "#4a0b24";
        playButton.style.borderRadius = "50%";
        playButton.style.border = "none";
        playButton.style.width = "80px";
        playButton.style.height = "80px";
        playButton.style.minWidth = "80px";
        playButton.style.minHeight = "80px";
        playButton.style.padding = "0";
        playButton.style.display = "flex";
        playButton.style.alignItems = "center";
        playButton.style.justifyContent = "center";

        // Style l'icône SVG
        const svg = playButton.querySelector("svg") as SVGElement;
        if (svg) {
          svg.style.fill = "#ffffff";
          svg.style.color = "#ffffff";
          svg.style.width = "28px";
          svg.style.height = "28px";
        }
      }
    });
  };

  // Applique les styles immédiatement
  stylePlayButton();

  // Ré-applique les styles après un court délai (au cas où les players se chargent tardivement)
  setTimeout(stylePlayButton, 500);
  setTimeout(stylePlayButton, 1000);
  setTimeout(stylePlayButton, 2000);

  // Observe les mutations du DOM pour capturer les nouveaux players ajoutés dynamiquement
  const observer = new MutationObserver(() => {
    stylePlayButton();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
});
