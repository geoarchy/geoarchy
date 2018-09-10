import * as React from "react";

const MapCompass = ({ ariaLabel, center, map }) => (
  <div
    className="mapboxgl-ctrl mapboxgl-ctrl-group"
    onClick={() =>
      map.flyTo({
        center
      })
    }
  >
    <button
      className="mapboxgl-ctrl-icon mapboxgl-ctrl-compass"
      type="button"
      ariaLabel={ariaLabel || "Reset North"}
    >
      <span
        className="mapboxgl-ctrl-compass-arrow"
        style={{ transform: "rotate(0deg)" }}
      />
    </button>
  </div>
);

MapCompass.config = {
  label: "Default Compass",
  description: "Shows an element that is pointing north"
};

export default MapCompass;
