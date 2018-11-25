import * as React from 'react'
import styled from 'styled-components'
import { Field } from 'formik'
import { Flex, Label, Button } from 'reakit'
import { MdAddCircleOutline } from 'react-icons/md'

import { TLayerGroup, TLayerFilter } from '../../../../types'

import ActionTray from '../components/ActionTray'

const Icon = styled.span`
  font-size: 24px;
  color: '#eee';
`

const AddLayerButton = () => (
  <Button color="white">
    <Icon>
      <MdAddCircleOutline />
    </Icon>
    Add Layer
  </Button>
)
const AddFilterButton = () => (
  <Button color="white">
    <Icon>
      <MdAddCircleOutline />
    </Icon>
    Add Filter
  </Button>
)

const LayerGroupLayersForm = ({
  layers,
  i,
}: {
  layers: [String]
  i: number
}) => (
  <ActionTray title="Layers" renderActions={() => <AddLayerButton />}>
    {layers &&
      layers.map((layer: String, layerId) => (
        <Flex row={true}>
          <Flex column={true}>
            <Label htmlFor={`layerGroups[${i}].layers[${layerId}]`}>
              {layer}
            </Label>
            <Field type="text" name={`layerGroups[${i}].layers[${layerId}]`} />
          </Flex>
        </Flex>
      ))}
  </ActionTray>
)

const LayerGroupFiltersForm = ({ filters, i }) => (
  <ActionTray title="Filters" renderActions={() => <AddFilterButton />}>
    {filters.map((filter: TLayerFilter, filterId) => (
      <Flex key={`filter-${filterId}`} column={true}>
        <Label>
          <strong>{filter.on}</strong>
        </Label>
        <Label htmlFor={`layerGroups[${i}].filters[${filterId}].on`}>On</Label>
        <Field type="text" name={`layerGroups[${i}].filters[${filterId}].on`} />
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
)

export default props => (
  <fieldset>
    <legend>
      <h3>Layer Groups</h3>
    </legend>
    {props.values.layerGroups &&
      props.values.layerGroups.map((layerGroup: TLayerGroup, i) => (
        <ActionTray
          key={`layer-group-${layerGroup.label}`}
          name={layerGroup.label}
          isParent={true}
        >
          <Flex row={true}>
            <Flex column={true}>
              <Label htmlFor="style">Label</Label>
              <Field type="text" name={`layerGroups[${i}].label`} />
            </Flex>
            <Flex column={true}>
              <Label htmlFor="style">ID</Label>
              <Field type="text" name={`layerGroups[${i}].id`} />
            </Flex>
          </Flex>
          <LayerGroupLayersForm i={i} layers={layerGroup.layers} />
          <Flex row={true} />
          {layerGroup.filters && (
            <Flex row={true}>
              <LayerGroupFiltersForm i={i} filters={layerGroup.filters} />
            </Flex>
          )}
        </ActionTray>
      ))}
  </fieldset>
)
