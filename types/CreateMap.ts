/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateMap
// ====================================================

export interface CreateMap_map_options {
  __typename: "TMapOptions";
  container: string;
  style: string;
}

export interface CreateMap_map_components {
  __typename: "TMapComponent";
  type: string;
  region: string;
}

export interface CreateMap_map_layerGroups {
  __typename: "TLayerGroup";
  hideOnLoad: boolean | null;
  label: string;
  id: string;
  layers: (string | null)[] | null;
}

export interface CreateMap_map {
  __typename: "TMapPayload";
  id: string;
  options: CreateMap_map_options | null;
  components: CreateMap_map_components[] | null;
  layerGroups: CreateMap_map_layerGroups[] | null;
}

export interface CreateMap {
  map: CreateMap_map | null;
}
