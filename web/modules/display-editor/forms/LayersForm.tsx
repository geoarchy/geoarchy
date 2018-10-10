import * as React from "react";
import styled from "styled-components";
import { Field } from "formik";
import { Block, Flex, Label, Button, Toolbar } from "reakit";
import { MdAddCircleOutline } from "react-icons/md";

import { TLayerGroup, TLayerFilter } from "@geoarchy/types";

interface ActionTrayProps {
  title: String;
  name?: String;
  renderActions: Function;
  headerEl: String | React.Component;
  isParent: Boolean;
}

class ActionTray extends React.Component<ActionTrayProps> {
  render() {
    const { title, name, renderActions, children, headerEl, isParent } = this.props;
    const HeaderComponent = headerEl || 'h2';
    return (
      <Block className="action-tray" width="100%" marginLeft={isParent ? 0 : 10} marginBottom={10}>
        <Toolbar background="black" gutter="4px 10px" marginBottom="1rem">
          <Toolbar.Content
            align="start"
            width="80%"
            row
            gridAutoColumns="max-content"
          >
            <HeaderComponent style={{ color: "white", width: "100%" }}>
              {title}
              {name && `: ${name}`}
            </HeaderComponent>
          </Toolbar.Content>
          <Toolbar.Content align="end">
            {renderActions && renderActions(this.props)}
          </Toolbar.Content>
        </Toolbar>
        {children}
      </Block>
    );
  }
}

const Icon = styled.span`
  font-size: 24px;
  color: white;
`;

const AddLayerButton = () => (
  <Button color="white">
    <Icon>
      <MdAddCircleOutline />
    </Icon>
    Add Layer
  </Button>
);
const AddFilterButton = () => (
  <Button color="white">
    <Icon>
      <MdAddCircleOutline />
    </Icon>
    Add Filter
  </Button>
);

ActionTray.defaultProps = {
  headerEl: "h3"
};

export default props => (
  <fieldset>
    <legend>
      <h3>Layer Groups</h3>
    </legend>
    {props.values.layerGroups.map((layerGroup: TLayerGroup, i) => (
      <ActionTray
        title="Layer Group"
        name={layerGroup.label}
        headerEl={"h3"}
        isParent
      >
        <Flex row>
          <Flex column>
            <Label htmlFor="style">Label</Label>
            <Field type="text" name={`layerGroups[${i}].label`} />
          </Flex>
          <Flex column>
            <Label htmlFor="style">ID</Label>
            <Field type="text" name={`layerGroups[${i}].id`} />
          </Flex>
        </Flex>
        <Flex row>
          <ActionTray
            title="Layers"
            renderActions={() => <AddLayerButton />}
            headerEl={"h4"}
          >
            {layerGroup.layers &&
              layerGroup.layers.map((layer: String, layerId) => (
                <Flex row>
                  <Flex column>
                    <Label htmlFor={`layerGroups[${i}].layers[${layerId}]`}>
                      Layer: {layer}
                    </Label>
                    <Field
                      type="text"
                      name={`layerGroups[${i}].layers[${layerId}]`}
                    />
                  </Flex>
                </Flex>
              ))}
          </ActionTray>
        </Flex>
        {layerGroup.filters && (
          <Flex row>
          <ActionTray
            title="Filters"
            renderActions={() => <AddFilterButton />}
            headerEl={"h4"}
          >
            {
              layerGroup.filters.map((filter: TLayerFilter, filterId) => (
                <Flex column>
                  <Label><strong>{filter.on}</strong></Label>
                  <Label htmlFor={`layerGroups[${i}].filters[${filterId}].on`}>
                    On
                  </Label>
                  <Field
                    type="text"
                    name={`layerGroups[${i}].filters[${filterId}].on`}
                  />
                  <Label htmlFor={`layerGroups[${i}].filters[${filterId}].operator`}>
                    Operator
                  </Label>
                  <Field
                    type="text"
                    name={`layerGroups[${i}].filters[${filterId}].operator`}
                  />
                </Flex>
              ))}
          </ActionTray>
        </Flex>
        )}
        
      </ActionTray>
    ))}
  </fieldset>
);
