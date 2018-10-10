import React from "react";
import { Field } from "formik";
import { Flex, Button, Label, Input } from "reakit";

export default () => (
  <React.Fragment>
    <Flex column>
      <Label htmlFor="title">Title</Label>
      <Field type="text" name="title" />
    </Flex>
    <fieldset>
      <legend>
        <h3>Style</h3>
      </legend>
      <Flex column>
        <Label htmlFor="style">Style</Label>
        <Field type="text" name="options.style" />
      </Flex>
      <Flex column>
        <Label htmlFor="style">Zoom</Label>
        <Field type="text" name="options.zoom" />
      </Flex>
      <Flex column>
        <Label htmlFor="style">Max Zoom</Label>
        <Field component={Input} type="text" name="options.maxZoom" />
      </Flex>
      <Flex column>
        <Label htmlFor="style">Min Zoom</Label>
        <Field type="text" name="options.minZoom" />
      </Flex>
      <Flex column>
          <h4>Default Center</h4>
          <Flex row >
            <Label htmlFor="options.center[0]">X:</Label>
            <Field type="text" name="options.center[0]" />
            <Label htmlFor="options.center[0]">Y:</Label>
            <Field type="text" name="options.center[1]" />
          </Flex>
          
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
