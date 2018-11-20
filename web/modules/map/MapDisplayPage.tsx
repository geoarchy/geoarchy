import * as React from 'react'
import { withMapQuery } from './queries'
import MapDisplay from './MapDisplay'

const MapDisplayPage = props => (
    <MapDisplay
        displayId={props.displayId}
        loading={props.loading}
        error={props.error}
        debugMode={false}
        map={props.data.map}
    />
)

export default withMapQuery(MapDisplayPage)
