export const mapDisplay1 = {
  title: "My Embedded Map",
  options: {
    container: "nj23h4jk23h4",
    style: "mapbox://styles/guanacaste/cjj079axn0aqu2so55fx6ln2x"
  },
  published: true,
  components: [
    {
      type: "MapCompass",
      ariaLabel: "Reset North",
      region: "TOP_LEFT"
    },
    {
      type: "MapZoom",
      ariaLabel: "Reset North",
      region: "TOP_RIGHT"
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
