export const mapDisplay1 = {
  title: "My Embedded Map",
  options: {
    container: "nj23h4jk23h4",
    style: "mapbox://styles/rerooting2040/cjlx4wwx01cs92sn1jvgjy793"
  },
  published: true,
  components: [
    {
      type: "MapCompass",
      ariaLabel: "Reset North",
      region: "top-left"
    },
    {
      type: "MapZoom",
      ariaLabel: "Reset North",
      region: "top-right"
    },
    {
      type: "StaticLegend",
      ariaLabel: "Legend",
      region: "bottom-left"
    }
  ],
  layerGroups: [
    {
      hideOnLoad: true,
      label: "Sectores",
      id: "group-sectores",
      layers: ["toggle-sectores", "sectores-nombres"]
    },
    {
      hideOnLoad: true,
      label: "Ecosistemas",
      id: "group-ecosistemas",
      layers: ["toggle-ecosistemas"],
      filterOn: "Name"
    },
    {
      hideOnLoad: true,
      label: "Turismo",
      id: "group-turismo",
      layers: ["toggle-turismo"],
      filters: [
        {
          on: "symbol",
          defaultWidget: "list",
          options: [
            {
              label: "Touristas",
              value: "turismo"
            },
            {
              label: "Estaciones",
              value: "estaciones"
            }
          ]
        }
      ],
      popup: {
        centerOnSelect: true,
        fields: {
          title: "feature.properties.Estación",
          link: "feature.properties.link",
          image: "feature.properties.Image",
          description: "feature.properties.description"
        }
      }
    },
    {
      hideOnLoad: true,
      label: "Unesco",
      id: "group-unesco",
      layers: ["toggle-unesco"],
      filterOn: "symbol"
    }
  ]
};
