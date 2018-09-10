import React from "react";
import { Field } from "formik";
import { Flex, Group } from "reakit";

export default class MapZoom extends React.Component {
    constructor(props, context) {
        super(props, context)
    }
  render() {
    return (
      <div className="mapboxgl-ctrl mapboxgl-ctrl-group">
        <button
          className="mapboxgl-ctrl-icon mapboxgl-ctrl-zoom-in"
          type="button"
          ariaLabel="Zoom In"
          onClick={() => this.props.map.zoomIn()}
        />
        <button
          className="mapboxgl-ctrl-icon mapboxgl-ctrl-zoom-out"
          type="button"
          ariaLabel="Zoom Out"
          onClick={() => this.props.map.zoomOut()}
        />
      </div>
    );
  }
}
