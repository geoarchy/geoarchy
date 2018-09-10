import React from "react";
import { Field } from "formik";
import { Flex } from "reakit";

export default props => (
  <fieldset>
    <legend>
      <h3>Layer Groups</h3>
    </legend>
    {props.values.layerGroups.map((C, i) => (
      <Flex row>
        <Flex column>
          <label htmlFor="style">Label</label>
          <Field type="text" name={`layerGroups[${i}].label`} />
        </Flex>
        <Flex column>
          <label htmlFor="style">ID</label>
          <Field type="text" name={`layerGroups[${i}].id`} />
        </Flex>
      </Flex>
    ))}
  </fieldset>
);
