import * as React from "react";
import * as mapboxgl from "mapbox-gl";
import { TMapDisplay } from "@geoarchy/types";
import { mapDisplay1 } from "../../fixtures";

interface Process {
  browser: boolean
}

declare var process: Process

interface MapDisplayProps extends TMapDisplay {
  accessToken: string;
}

interface MapDisplayState {
  style: any;
  layers: any;
  componentsCanRender: boolean,
}

class MapDisplay extends React.Component<MapDisplayProps, MapDisplayState> {
  mapbox: any;
  map: { initialLoaded: Boolean } & mapboxgl.Map;
  style: any;
  layers: any;
  props: MapDisplayProps;
  state: { style: any; layers: any; componentsCanRender: boolean; };

  static defaultProps = mapDisplay1;
  constructor(props: MapDisplayProps) {
    super(props);
    this.state = {
      style: null,
      layers: null,
      componentsCanRender: false
    };
    this.initializeMap = this.initializeMap.bind(this);
    this.renderMapboxControlPortals = this.renderMapboxControlPortals.bind(
      this
    );
  }

  forLayerInGroups(layerGroups, fn, layerFilter = null) {
    if (layerFilter) {
      layerGroups.forEach(layerGroup => {
        layerGroup.layers && layerGroup.layers.filter(layerFilter).forEach(fn);
      });
      return;
    }
    layerGroups.forEach(layerGroup => layerGroup.layers.forEach(fn));
    return;
  }

  initializeMap() {
    // only shows up in the browser bundle
    this.mapbox = require("mapbox-gl");
    this.mapbox.accessToken =
      this.props.accessToken ||
      "pk.eyJ1IjoicmVyb290aW5nMjA0MCIsImEiOiJjamx4NHZreHIwcGhkM3FwZ2F5ZWxqYTM4In0.djRgaveFi1gWzxFOrLiDJQ";
    this.map = new this.mapbox.Map(this.props.options);

    // firing before the map loads, data will
    this.map.on("data", () => {
      if (!this.map.initialLoaded && !this.map.loaded()) {
        const hiddenLayers = this.props.layerGroups.filter(
          group => group.hideOnLoad
        );
        this.forLayerInGroups(hiddenLayers, layerId => {
          this.map.setLayoutProperty(layerId, "visibility", "none");
        });
        this.map.initialLoaded = true;
      }
    });
    this.map.on("load", () => {
      const style = this.map.getStyle();
      const layers = style.layers.reduce((acc, layer) => {
        return { ...acc, [layer.id]: layer };
      }, {});
      delete style.layers;
      this.setState({ style, layers });
      this.setState({ componentsCanRender: true });
    });
  }

  componentDidMount() {
    // DOM has map id
    if (process.browser) {
      this.initializeMap();
    }
  }

  renderMapboxControlPortals() {
    const componentMap = {
      MapCompass: require("./components/MapCompass").default,
      MapZoom: require("./components/MapZoom").default
    };
    return ["bottom-left", "bottom-right", "top-right", "top-left"].map(
      region => {
        const regionCs = this.props.components.filter(c => c.region === region);

        return (
          <div className={`mapboxgl-ctrl-${region}`}>
            {regionCs.map((C, n) => {
              const ResultComponent = componentMap[C.type];
              return (
                <ResultComponent
                  map={this.map}
                  mapbox={this.mapbox}
                  key={`${C.type}-${n}`}
                  {...C}
                  {...this.state.style}
                />
              );
            })}
          </div>
        );
      }
    );
  }

  render() {
    return (
      <div
        style={{
          position: "relative"
        }}
      >
        <style jsx>{`
          .map-display {
            height: 100vh;
          }
        `}</style>
        <div className="mapbox-control-container">
          {this.renderMapboxControlPortals()}
        </div>
        <div className="map-display" id={this.props.options.container} />
      </div>
    );
  }
}

export default MapDisplay;
