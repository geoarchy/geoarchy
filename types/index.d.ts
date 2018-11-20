import { MapboxOptions } from "mapbox-gl";

export type TPopupFields = {
  title: String;
  link: String;
  image: String;
  description: String;
};

export type TPopupSettings = {
  centerOnSelect: Boolean;
  fields: TPopupFields;
};

export type TLayerGroup = {
  hideOnLoad?: Boolean;
  label: String;
  id: String;
  layers: String[];
  filters: TLayerFilter[];
  popup: TPopupSettings;
};

export type TLayerFilterOption = {
  value: String;
  label: String;
};

export type TLayerFilter = {
  options: [TLayerFilterOption];
  on: String;
  operator: String;
  defaultWidget: String;
};

export type TMapDisplayComponent = {
  label: String;
  id: String;
  position: String;
  region: String;
  type: String;
};

export type TMapDisplay = {
  debugMode: Boolean;
  components: TMapDisplayComponent[];
  options: MapboxOptions;
  layerGroups: TLayerGroup[];
};
