import React from "react";
import { Field } from "formik";
import { Flex } from "reakit";

export default props => (
  <fieldset>
    <legend>
      <h3>Components</h3>
    </legend>
    {props.values.components.map((C, i) => {
      return (
        <Flex row>
          <Flex column>
            <label for="style">Type</label>
            <Field type="text" name={`components[${i}].type`} />
          </Flex>
          <Flex column>
            <label for="style">Region</label>
            <Field type="text" name={`components[${i}].region`} />
          </Flex>
        </Flex>
      );
    })}
  </fieldset>
);
