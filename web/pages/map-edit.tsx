import * as React from "react";
import gql from 'graphql-tag';
import { Query } from "react-apollo";

import { TMapDisplay } from '@geoarchy/types'

import MapApp from "../modules/map/MapApp";
import MapEditForm from '../modules/display-editor/MapEditForm';

interface MapEditPageProps {
  router: {
    query: {
      id: String
    }
  }
}

export default (props: MapEditPageProps) => {
  return (
    <MapApp>
      <MapEditForm displayId={props.router && props.router.query.id} />
    </MapApp>
  );
};
