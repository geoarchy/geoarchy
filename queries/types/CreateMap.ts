/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateMap
// ====================================================

export interface CreateMap_map_options {
  container: string;
  style: string;
}

export interface CreateMap_map_components {
  type: string;
  region: string;
}

export interface CreateMap_map_layerGroups {
  hideOnLoad: boolean | null;
  label: string;
  id: string;
  layers: (string | null)[] | null;
}

export interface CreateMap_map {
  id: string;
  options: CreateMap_map_options | null;
  components: CreateMap_map_components[] | null;
  layerGroups: CreateMap_map_layerGroups[] | null;
}

export interface CreateMap {
  map: CreateMap_map | null;
}
