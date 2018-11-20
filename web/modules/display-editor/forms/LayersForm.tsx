import * as React from 'react'
import styled from 'styled-components'
import { Field } from 'formik'
import { Flex, Label, Button } from 'reakit'
import { MdAddCircleOutline } from 'react-icons/md'

import { TLayerGroup, TLayerFilter } from '@geoarchy/types'

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

export default props => (
    <fieldset>
        <legend>
            <h3>Layer Groups</h3>
        </legend>
        {props.values.layerGroups.map((layerGroup: TLayerGroup, i) => (
            <ActionTray
                key={`layer-group-${layerGroup.label}`}
                name={layerGroup.label}
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
                    >
                        {layerGroup.layers &&
                            layerGroup.layers.map((layer: String, layerId) => (
                                <Flex row>
                                    <Flex column>
                                        <Label
                                            htmlFor={`layerGroups[${i}].layers[${layerId}]`}
                                        >
                                            {layer}
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
                        >
                            {layerGroup.filters.map(
                                (filter: TLayerFilter, filterId) => (
                                    <Flex key={`filter-${filterId}`} column>
                                        <Label>
                                            <strong>{filter.on}</strong>
                                        </Label>
                                        <Label
                                            htmlFor={`layerGroups[${i}].filters[${filterId}].on`}
                                        >
                                            On
                                        </Label>
                                        <Field
                                            type="text"
                                            name={`layerGroups[${i}].filters[${filterId}].on`}
                                        />
                                        <Label
                                            htmlFor={`layerGroups[${i}].filters[${filterId}].operator`}
                                        >
                                            Operator
                                        </Label>
                                        <Field
                                            type="text"
                                            name={`layerGroups[${i}].filters[${filterId}].operator`}
                                        />
                                    </Flex>
                                )
                            )}
                        </ActionTray>
                    </Flex>
                )}
            </ActionTray>
        ))}
    </fieldset>
)
