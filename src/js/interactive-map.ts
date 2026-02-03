declare const L: any;
declare const IM_Settings: any;

console.log("Interactive map script loaded!");

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded event fired");

  const mapElement = document.getElementById("im-map");
  console.log("Map element:", mapElement);

  if (!mapElement) {
    console.error("Map element not found!");
    return;
  }

  console.log("Checking Leaflet...", typeof L);
  if (typeof L === "undefined") {
    console.error("Leaflet (L) is not loaded");
    return;
  }

  console.log("Checking IM_Settings...", typeof IM_Settings);
  if (typeof IM_Settings === "undefined") {
    console.error("IM_Settings is not defined");
    return;
  }

  console.log("Interactive map initializing...", IM_Settings);

  const imgWidth = 1023;
  const imgHeight = 650;

  const FRANCE = { x: 500, y: 300 };

  // Fonction pour convertir lat/lng en coordonnées pixel sur la carte
  const latLngToPixel = (lat: number, lng: number) => {
    // Bounds ajustés pour la carte Europe (basé sur l'analyse du SVG)
    const mapBounds = {
      north: 60, // Latitude nord (Scandinavie)
      south: 35, // Latitude sud (Méditerranée)
      west: -10, // Longitude ouest (Atlantique)
      east: 30, // Longitude est (Europe de l'Est)
    };

    const x =
      ((lng - mapBounds.west) / (mapBounds.east - mapBounds.west)) * imgWidth;
    const y =
      ((mapBounds.north - lat) / (mapBounds.north - mapBounds.south)) *
      imgHeight;

    return { x: Math.round(x), y: Math.round(y) };
  };

  // Coordonnées approximatives basées sur une carte Europe 1023x650
  const pinsData = [
    { x: 350, y: 280, title: "Paris", content: "Capitale de la France" },
    { x: 280, y: 220, title: "London", content: "Capitale du Royaume-Uni" },
    { x: 320, y: 240, title: "Calais", content: "Port français sur la Manche" },
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
      console.log("Creating image overlay with path:", IM_Settings.imagePath);
      console.log("Bounds:", bounds);
      overlay = L.imageOverlay(IM_Settings.imagePath, bounds).addTo(map);
      console.log("Overlay created:", overlay);
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
      pinsData.forEach((pin) => {
        const x = pin.x * scale - offsetX;
        const y = pin.y * scale - offsetY;

        const marker = L.marker([y, x], {
          icon: L.divIcon({
            className: "",
            html: `<div class="pin">${pinIcon}</div>`,
            iconSize: [40, 40],
            iconAnchor: [20, 20],
          }),
        }).addTo(map);

        marker.on("click", () => {
          const drawerTitle = document.getElementById("drawer-title");
          const drawerContent = document.getElementById("drawer-content");
          const drawer = document.getElementById("im-drawer");

          if (drawerTitle) drawerTitle.textContent = pin.title;
          if (drawerContent) drawerContent.textContent = pin.content;
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

  // Debug: afficher les coordonnées au clic pour placer les pins
  map.on("click", (e: any) => {
    const drawer = document.getElementById("im-drawer");
    if (drawer) drawer.classList.remove("open");

    // Log des coordonnées pour debug (conversion inverse)
    const latlng = e.latlng;
    const pixelX = Math.round(latlng.lng);
    const pixelY = Math.round(latlng.lat);

    // Conversion inverse pixel -> lat/lng réelle
    const realLng = (pixelX / imgWidth) * (30 - -10) + -10;
    const realLat = 60 - (pixelY / imgHeight) * (60 - 35);

    console.log(`Pixel: x: ${pixelX}, y: ${pixelY}`);
    console.log(
      `Géo estimé: lat: ${realLat.toFixed(4)}, lng: ${realLng.toFixed(4)}`
    );
  });
});
