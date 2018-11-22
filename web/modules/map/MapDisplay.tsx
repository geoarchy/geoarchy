import * as React from 'react'
import * as mapboxgl from 'mapbox-gl'
import { TMapDisplay } from '../../../types'

import { ACCESS_TOKEN } from '../../lib/config'

const MAP_ID = 'map-container'

interface Process {
  browser: boolean
}

declare var process: Process

interface MapDisplayProps {
  displayId: String
  accessToken?: String
  debugMode: Boolean
  map: TMapDisplay
  loading: any
  error: any
}

interface MapDisplayState {
  style: any
  layers: any
  componentsCanRender: boolean
  isSupported: boolean
}

const MapContainer = props => (
  <React.Fragment>
    <style>{`
      .map-display {
        height: 100vh;
      }
    `}</style>
    <div className="map-display" id={MAP_ID}>
      {props.children}
    </div>
  </React.Fragment>
)

class MapDisplay extends React.Component<MapDisplayProps, MapDisplayState> {
  mapbox: any
  map: { initialLoaded: Boolean } & mapboxgl.Map
  style: any
  layers: any

  constructor(props: MapDisplayProps) {
    super(props)
    this.state = {
      style: null,
      layers: null,
      componentsCanRender: false,
      isSupported: true,
    }
    this.initializeMap = this.initializeMap.bind(this)
    this.renderMapboxControlPortals = this.renderMapboxControlPortals.bind(this)
  }

  forLayerInGroups(layerGroups, fn, layerFilter = null) {
    if (layerFilter) {
      layerGroups.forEach(layerGroup => {
        layerGroup.layers && layerGroup.layers.filter(layerFilter).forEach(fn)
      })
      return
    }
    layerGroups.forEach(layerGroup => layerGroup.layers.forEach(fn))
    return
  }

  initializeMap() {
    // only shows up in the browser bundle
    this.mapbox = require('mapbox-gl')
    this.mapbox.accessToken = ACCESS_TOKEN

    const isSupported = this.mapbox.supported()
    if (isSupported) {
      this.map = new this.mapbox.Map({
        // ...this.state.style.options,
        // ...this.props.options,
        ...this.props.map.options,
        zoom: 9,
        style: 'mapbox://styles/rerooting2040/cjopaywcn4lbq2sn985cr5fcs',
        center: [-85.41546435360851, 10.881280311177292],
        container: MAP_ID,
      })
    }

    // firing before the map loads, data will
    this.map.on('data', () => {
      if (!this.map.initialLoaded && !this.map.loaded()) {
        const hiddenLayers = this.props.map.layerGroups.filter(
          group => group.hideOnLoad
        )
        this.forLayerInGroups(hiddenLayers, layerId => {
          this.map.setLayoutProperty(layerId, 'visibility', 'none')
        })
        this.map.initialLoaded = true
      }
    })
    this.map.on('load', () => {
      const style = this.map.getStyle()
      const layers = style.layers.reduce((acc, layer) => {
        return { ...acc, [layer.id]: layer }
      }, {})
      delete style.layers
      this.setState({ style, layers })
      this.setState({ componentsCanRender: true })
    })
  }
  componentDidMount() {
    // DOM has map id
    if (
      window &&
      process.browser &&
      !this.props.loading &&
      this.props.map.layerGroups
    ) {
      this.initializeMap()
    }
  }

  renderMapboxControlPortals(props) {
    const componentMap = {
      MapCompass: require('./components/MapCompass').default,
      MapZoom: require('./components/MapZoom').default,
      StaticLegend: require('./components/StaticLegend').default,
    }
    return (
      !props.loading &&
      props.map &&
      props.map.components &&
      ['bottom-left', 'bottom-right', 'top-right', 'top-left'].map(region => {
        const regionCs = props.map.components.filter(c => c.region === region)

        return (
          <div key={`region-${region}`} className={`mapboxgl-ctrl-${region}`}>
            {regionCs.map((C, n) => {
              const ResultComponent = componentMap[`${C.type}`]
              return (
                <ResultComponent
                  map={this.map}
                  mapbox={this.mapbox}
                  key={`${C.type}-${n}`}
                  {...C}
                  layerGroups={props.map.layerGroups}
                />
              )
            })}
          </div>
        )
      })
    )
  }

  render() {
    const { loading, error } = this.props
    if (loading) {
      return (
        <MapContainer className="mapbox-control-container">
          Loading map display...
        </MapContainer>
      )
    }
    if (error) {
      return (
        <MapContainer className="mapbox-control-container">
          <p>Error loading map...</p>
          <pre>{error.toString()}</pre>
        </MapContainer>
      )
    }
    return (
      <div
        style={{
          position: 'relative',
        }}
      >
        <MapContainer />
        {this.renderMapboxControlPortals(this.props)}
      </div>
    )
  }
}

export default MapDisplay
