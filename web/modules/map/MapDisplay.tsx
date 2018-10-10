import * as React from "react";
import * as mapboxgl from "mapbox-gl";
import gql from 'graphql-tag'
import { TMapDisplay } from "@geoarchy/types";
import { Query } from "react-apollo"
import { mapDisplay1 } from "../../fixtures";

import { ACCESS_TOKEN } from "../../lib/config";

interface Process {
  browser: boolean;
}

declare var process: Process;

interface MapDisplayProps extends TMapDisplay {
  displayId: String;
  accessToken?: String;
}

interface MapDisplayState {
  style: any;
  layers: any;
  componentsCanRender: boolean;
}
const GET_DISPLAY = gql`
  query getMap($id: String, $username: String ){
      map(id: $id, username: $username) {
        id
        options {
          container
          style
        }
        components {
          type
          region
        }
        layerGroups {
          hideOnLoad
          label
          id
          layers
        }
      }
  }
`

class MapDisplay extends React.Component<MapDisplayProps, MapDisplayState> {
  mapbox: any;
  map: { initialLoaded: Boolean } & mapboxgl.Map;
  style: any;
  layers: any;
  props: MapDisplayProps;
  state: { style: any; layers: any; componentsCanRender: boolean };

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
    this.mapbox.accessToken = this.props.accessToken || ACCESS_TOKEN;
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

  renderMapboxControlPortals(props) {
    const componentMap = {
      MapCompass: require("./components/MapCompass").default,
      MapZoom: require("./components/MapZoom").default,
      StaticLegend: require("./components/StaticLegend").default
    };
    return ["bottom-left", "bottom-right", "top-right", "top-left"].map(
      region => {
        const regionCs = props.components.filter(c => c.region === region);

        return (
          <div className={`mapboxgl-ctrl-${region}`}>
            {regionCs.map((C, n) => {
              const ResultComponent = componentMap[`${C.type}`];
              return (
                <ResultComponent
                  map={this.map}
                  mapbox={this.mapbox}
                  key={`${C.type}-${n}`}
                  {...C}
                  {...this.state.style}
                  layerGroups={props.layerGroups}
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
        <Query 
      query={GET_DISPLAY} 
      variables={{ 
        id: this.props.displayId,
        username: 'bob_4@bob.com'
      }}
    >
      {({ data, loading, error }) => {
        if (loading) {
          return <div className="mapbox-control-container">Loading map display...</div>
        }
        if (error) {
          return (
          <div className="mapbox-control-container">
            <p>Error loading map...</p>
            <pre>{error.toString()}</pre>
          </div>
          )
        }
        return (
          <div className="mapbox-control-container">
            {this.renderMapboxControlPortals({ ...this.props, ...data, error })}
          </div>
        )
      }}
        
      </Query>  
      <div className="map-display" id={`${this.props.options.container}`} />
    </div>
       
    );
  }
}

export default MapDisplay;
