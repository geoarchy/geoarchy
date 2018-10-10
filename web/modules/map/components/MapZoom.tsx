import * as React from "react";
import * as Mapbox from "mapbox-gl";

interface MapZoomProps {
  map: Mapbox.Map;
}

const MapZoom: React.SFC<MapZoomProps> = (props) => (
  <div className="mapboxgl-ctrl mapboxgl-ctrl-group">
    <button
      className="mapboxgl-ctrl-icon mapboxgl-ctrl-zoom-in"
      type="button"
      aria-label="Zoom In"
      onClick={() => props.map.zoomIn()}
    />
    <button
      className="mapboxgl-ctrl-icon mapboxgl-ctrl-zoom-out"
      type="button"
      aria-label="Zoom Out"
      onClick={() => props.map.zoomOut()}
    />
  </div>
)

export default MapZoom;