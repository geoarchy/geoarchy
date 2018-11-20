import * as React from "react";
import styled from "styled-components";

import { TLayerGroup } from "../../../../types";

interface MapCompassProps {
  layerGroups: TLayerGroup[];
}

const LegendList = styled.ul`
  display: block;
  text-align: left;
  list-style: none;
  margin: 0;
  padding: 1rem;
`;

const LegendListItem = styled.li`
  display: block;
  padding: 0.4rem;
  vertical-align: middle;
`;

interface IconProps {
  backgroundColor?: any;
}

const LegendListIcon = styled.span`
  display: inline-block;
  padding: 0.5rem;
  border-radius: 0.6rem;
  margin-right: 0.3rem;
  background-color: ${(props: IconProps) => props.backgroundColor};
`;

const StaticLegend: React.SFC<MapCompassProps> = props => {
  console.log(props);
  return (
    <div className="mapboxgl-ctrl mapboxgl-ctrl-group static-legend">
      <LegendList>
        {props.layerGroups.map((layerGroup, i) => (
          <LegendListItem key={`lg-legend-${i}`}>
            <LegendListIcon backgroundColor="red" />
            {layerGroup.label}
          </LegendListItem>
        ))}
      </LegendList>
    </div>
  );
};

StaticLegend.defaultProps = {
  layerGroups: []
};

export default StaticLegend;
