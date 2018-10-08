/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getMap
// ====================================================

export interface getMap_map_options {
  __typename: "TMapOptions";
  container: string;
  style: string;
}

export interface getMap_map_components {
  __typename: "TMapComponent";
  type: string;
  region: string;
}

export interface getMap_map_layerGroups {
  __typename: "TLayerGroup";
  hideOnLoad: boolean | null;
  label: string;
  id: string;
  layers: (string | null)[] | null;
}

export interface getMap_map {
  __typename: "TMapPayload";
  id: string;
  options: getMap_map_options | null;
  components: getMap_map_components[] | null;
  layerGroups: getMap_map_layerGroups[] | null;
}

export interface getMap {
  map: getMap_map | null;
}
