export function build() {
  return {
    Compass: {
      title: "Map Compass",
      description:
        "Element rendered inside the map which always points north using CSS3 transform",
      props: {
        style: "styles",
        image: "image?",
        svg: "svg?",
        quadrant: "quadrant"
      }
    },
    StaticLegend: {
      title: "Static Legend",
      description:
        "Static legend without interactivity, tied to singular layers",
      props: {
        legendItems: [
          {
            layer: "layer!",
            icon: "icon!"
          }
        ],
        style: "staticLegendStyle"
      }
    }
  };
}
