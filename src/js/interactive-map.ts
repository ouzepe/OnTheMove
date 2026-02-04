declare const L: any;
declare const IM_Settings: any;

interface PinData {
  x: number;
  y: number;
  site_title: string;
  tooltip_title: string;
  image?: string;
  groups: string[];
}

document.addEventListener("DOMContentLoaded", () => {
  const mapElement = document.getElementById("im-map");

  if (!mapElement) {
    return;
  }

  const imgWidth = 1023;
  const imgHeight = 650;

  const FRANCE = { x: 500, y: 300 };

  // Données des pins avec coordonnées x/y (clique sur la carte pour obtenir les coordonnées)
  const pinsData =
    IM_Settings.pins && IM_Settings.pins.length > 0
      ? IM_Settings.pins
      : [
          {
            x: 344.0465,
            y: 431.8514,
            title: "London",
            content: "Capitale du Royaume-Uni",
          },
          {
            x: 764.8055,
            y: 453.7027,
            title: "Paris",
            content: "Capitale de la France",
          },
          {
            x: 746.6169,
            y: 503.7213,
            title: "Calais",
            content: "Port français sur la Manche",
          },
        ];

  const pinIcon = `
        <svg class="pinIcon" width="60" height="68" viewBox="0 0 60 68" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="30" r="15.5" stroke="#F6F6F6" stroke-width="10"/>
            <path d="M30 65L22 52C25 53 27 53 30 53C33 53 35 53 38 52L30 65Z" fill="#F6F6F6"/>
        </svg>
    `;

  const map = L.map("im-map", {
    crs: L.CRS.Simple,
    zoomControl: false,
    dragging: true,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    minZoom: 0.4,
    maxZoom: 0.4,
  });

  let overlay: any;
  const markers: any[] = [];

  function updateMap() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const scale = Math.max(vw / imgWidth, vh / imgHeight);
    const scaledW = imgWidth * scale;
    const scaledH = imgHeight * scale;
    const offsetX = (scaledW - vw) / 2;
    const offsetY = (scaledH - vh) / 2;

    const bounds = [
      [-offsetY, -offsetX],
      [scaledH - offsetY, scaledW - offsetX],
    ];

    if (!overlay) {
      overlay = L.imageOverlay(IM_Settings.imagePath, bounds).addTo(map);
    } else {
      overlay.setBounds(bounds);
    }

    map.fitBounds(bounds, { animate: false });
    map.setMaxBounds(bounds);
    map.options.maxBoundsViscosity = 1;

    const centerX = FRANCE.x * scale - offsetX;
    const centerY = FRANCE.y * scale - offsetY;
    map.setView([centerY, centerX], map.getZoom(), { animate: false });

    if (!markers.length) {
      pinsData.forEach((pin: PinData) => {
        // Convertir les coordonnées relatives à l'image en coordonnées Leaflet
        const x = pin.x * scale - offsetX;
        const y = pin.y * scale - offsetY;

        const marker = L.marker([y, x], {
          icon: L.divIcon({
            className: "",
            html: `
              <div class="pin-container">
                <div class="pin-tooltip">${pin.tooltip_title}</div>
                <div class="pin">${pinIcon}</div>
              </div>
            `,
            iconSize: [60, 68],
            iconAnchor: [30, 68],
          }),
        }).addTo(map);

        marker.on("click", () => {
          const drawerContent = document.getElementById("drawer-content");
          const drawer = document.getElementById("im-drawer");

          if (drawerContent) {
            // Construire le contenu : Image -> H1 avec SVG (site_title) -> Premier groupe uniquement
            let content = "";

            // 1. Image
            if (pin.image) {
              content += pin.image;
            }

            // 2. Titre du site en H1 avec icône SVG position
            content += `
              <div class="drawer-title-wrapper">
                <svg class="drawer-title-icon" width="12" height="17" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.83333 12.0625C7.20833 10.9514 8.24653 9.88194 8.94792 8.85417C9.64931 7.82639 10 6.86111 10 5.95833C10 4.70833 9.61111 3.68056 8.83333 2.875C8.05556 2.06944 7.05556 1.66667 5.83333 1.66667C4.61111 1.66667 3.61111 2.06944 2.83333 2.875C2.05556 3.68056 1.66667 4.70833 1.66667 5.95833C1.66667 6.86111 2.01736 7.82639 2.71875 8.85417C3.42014 9.88194 4.45833 10.9514 5.83333 12.0625ZM5.83333 14.1667C3.875 12.7222 2.41319 11.3194 1.44792 9.95833C0.482639 8.59722 0 7.26389 0 5.95833C0 4.22222 0.541667 2.79514 1.625 1.67708C2.70833 0.559028 4.11111 0 5.83333 0C7.55556 0 8.95833 0.559028 10.0417 1.67708C11.125 2.79514 11.6667 4.22222 11.6667 5.95833C11.6667 7.26389 11.184 8.59722 10.2188 9.95833C9.25347 11.3194 7.79167 12.7222 5.83333 14.1667ZM5.83333 7.5C6.29167 7.5 6.68403 7.3368 7.01042 7.01042C7.33681 6.68403 7.5 6.29167 7.5 5.83333C7.5 5.375 7.33681 4.98264 7.01042 4.65625C6.68403 4.32986 6.29167 4.16667 5.83333 4.16667C5.375 4.16667 4.98264 4.32986 4.65625 4.65625C4.32986 4.98264 4.16667 5.375 4.16667 5.83333C4.16667 6.29167 4.32986 6.68403 4.65625 7.01042C4.98264 7.3368 5.375 7.5 5.83333 7.5ZM0 16.6667V15H11.6667V16.6667H0Z" fill="#8F3544"/>
                </svg>
                <h1>${pin.site_title}</h1>
              </div>
            `;

            // 3. Afficher uniquement le premier groupe
            if (pin.groups && pin.groups.length > 0) {
              content += pin.groups[0]; // Premier groupe seulement
            }

            drawerContent.innerHTML = content;
          }
          if (drawer) drawer.classList.add("open");
        });

        markers.push(marker);
      });
    } else {
      markers.forEach((marker, i) => {
        const x = pinsData[i].x * scale - offsetX;
        const y = pinsData[i].y * scale - offsetY;
        marker.setLatLng([y, x]);
      });
    }
  }

  updateMap();
  window.addEventListener("resize", updateMap);

  // Debug: afficher les coordonnées Leaflet au clic (AVANT scale/offset)
  map.on("click", (e: any) => {
    const drawer = document.getElementById("im-drawer");
    if (drawer) drawer.classList.remove("open");

    const latlng = e.latlng;

    // Récupérer le scale et offset actuels
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const scale = Math.max(vw / imgWidth, vh / imgHeight);
    const scaledW = imgWidth * scale;
    const scaledH = imgHeight * scale;
    const offsetX = (scaledW - vw) / 2;
    const offsetY = (scaledH - vh) / 2;

    // Convertir les coordonnées Leaflet en coordonnées relatives à l'image
    const x = (latlng.lng + offsetX) / scale;
    const y = (latlng.lat + offsetY) / scale;

    console.log(
      `📍 Coordonnées pour pinsData: x: ${x.toFixed(4)}, y: ${y.toFixed(4)}`
    );
  });
});
