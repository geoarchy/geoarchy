import * as React from 'react'

import MapApp from '../modules/map/MapApp'
import MapDisplayPage from '../modules/map/MapDisplayPage'

export default props => {
  return (
    <MapApp>
      <MapDisplayPage displayId={props.router.query.id} />
    </MapApp>
  )
}
