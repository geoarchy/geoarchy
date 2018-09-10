import * as React from 'react'
import MapApp from '../modules/map/MapApp'
import Header from '../components/Header'
import MapDisplay from '../modules/map/MapDisplay'

export default (props) => {
    return (
        <MapApp>
            <MapDisplay />
        </MapApp>
      )
}
