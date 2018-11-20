import * as React from 'react'
import * as Mapbox from 'mapbox-gl'

export interface MapCompassOptions {
    ariaLabel: String
    region: String
}

export interface MapCompassProps {
    ariaLabel: String
    center: [number, number]
    map: Mapbox.Map
}

const MapCompass: React.SFC<MapCompassProps> = ({ ariaLabel, center, map }) => (
    <div
        className="mapboxgl-ctrl mapboxgl-ctrl-group"
        onClick={() =>
            map.flyTo({
                center,
            })
        }
    >
        <button
            className="mapboxgl-ctrl-icon mapboxgl-ctrl-compass"
            type="button"
            aria-label={`${ariaLabel}`}
        >
            <span
                className="mapboxgl-ctrl-compass-arrow"
                style={{ transform: 'rotate(0deg)' }}
            />
        </button>
    </div>
)

export const config = {
    label: 'Default Compass',
    description: 'Shows an element that is pointing north',
}

export default MapCompass
