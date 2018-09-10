import * as React from "react";
import Header from "../components/Header";
import MapApp from "../modules/map/MapApp";
import MapEditForm from "../modules/display-editor/MapEditForm";

export default () => {
  return (
    <MapApp>
      <MapEditForm />
    </MapApp>
  );
};
