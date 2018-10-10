import * as React from "react";
import gql from 'graphql-tag';
import { Query } from "react-apollo";

import MapApp from "../modules/map/MapApp";
import MapDisplay from "../modules/map/MapDisplay";

export default props => {
  return (
    <MapApp>
      <MapDisplay displayId={props.router.query.id} />
    </MapApp>
  );
};
