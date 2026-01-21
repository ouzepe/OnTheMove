/**
 * Interactive Map TS
 * Version TypeScript avec types Leaflet
 */

export {};

declare const L: any;

interface PinData {
  x: number;
  y: number;
  title: string;
  content: string;
}

interface IMSettings {
  imagePath: string;
}

declare global {
  interface Window {
    IM_Settings: IMSettings;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const pinIcon: string =
    '<svg class="pinIcon" width="60" height="68" viewBox="0 0 60 68" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_135_815)"><circle cx="30" cy="30.1667" r="15.5" stroke="#F6F6F6" stroke-width="10"/><path d="M30.0004 65.3336L22.2631 51.9323C24.6701 52.8368 27.2772 53.3336 30.0004 53.3336C32.7232 53.3336 35.3299 52.8366 37.7367 51.9323L30.0004 65.3336Z" fill="#F6F6F6"/></g><defs><clipPath id="clip0_135_815"><rect width="60" height="68" fill="white"/></clipPath></defs></svg>';

  function initInteractiveMap(): void {
    if (typeof L === "undefined") {
      setTimeout(initInteractiveMap, 50);
      return;
    }

    const map = L.map("im-map", {
      crs: L.CRS.Simple,
      minZoom: 0.9,
      maxZoom: 0.9,
      zoomControl: false,
    });

    const bounds = [
      [0, 0],
      [650, 1023],
    ];
    L.imageOverlay(window.IM_Settings.imagePath, bounds).addTo(map);
    map.fitBounds(bounds);

    map.setMaxBounds(bounds);
    map.setMinZoom(map.getZoom());
    map.options.maxBoundsViscosity = 1.0;

    const pinsData: PinData[] = [
      { x: 340, y: 440, title: "Pin 1", content: "Contenu du pin 1" },
      { x: 650, y: 280, title: "Pin 2", content: "Contenu du pin 2" },
      { x: 825, y: 155, title: "Pin 3", content: "Contenu du pin 3" },
    ];

    pinsData.forEach((pin: PinData) => {
      const icon = L.divIcon({
        className: "",
        html: '<div class="pin">' + pinIcon + "</div>",
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      const marker = L.marker([pin.y, pin.x], { icon }).addTo(map);

      marker.on("click", () => {
        const drawerTitle = document.getElementById("drawer-title");
        const drawerContent = document.getElementById("drawer-content");
        const drawer = document.getElementById("im-drawer");

        if (drawerTitle) drawerTitle.textContent = pin.title;
        if (drawerContent) drawerContent.textContent = pin.content;
        if (drawer) drawer.classList.add("open");
      });
    });

    map.on("click", () => {
      const drawer = document.getElementById("im-drawer");
      if (drawer) drawer.classList.remove("open");
    });
  }

  initInteractiveMap();
});
