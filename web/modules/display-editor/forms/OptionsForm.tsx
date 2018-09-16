import React from "react";
import { Field } from "formik";
import { Flex, Group, Button } from "reakit";

export default () => (
  <React.Fragment>
    <Flex column>
      <label htmlFor="title">Title</label>
      <Field type="text" name="title" />
    </Flex>
    <fieldset>
      <legend>
        <h3>Style</h3>
      </legend>
      <Flex column>
        <label htmlFor="style">Style</label>
        <Field type="text" name="options.style" />
      </Flex>
      <Flex column>
        <label htmlFor="style">Zoom</label>
        <Field type="text" name="options.zoom" />
      </Flex>
      <Flex column>
        <label htmlFor="style">Max Zoom</label>
        <Field type="text" name="options.maxZoom" />
      </Flex>
      <Flex column>
        <label htmlFor="style">Min Zoom</label>
        <Field type="text" name="options.minZoom" />
      </Flex>
      <Flex column>
        <label htmlFor="center">Center</label>
        <Group>
          <Field type="text" name="options.center[0]" />
          <Field type="text" name="options.center[1]" />
        </Group>
      </Flex>
      <Button>Update Style</Button>
    </fieldset>
    <fieldset>
      <legend>
        <h3>Embed</h3>
      </legend>
      <textarea width="100%" cols="42">
        sdfdsfsd
      </textarea>
    </fieldset>
  </React.Fragment>
);
