import react from 'react'
import { Field } from 'formik'
import { InputField } from './Fields'
import { Flex, Button, Label } from 'reakit'

export default () => (
  <React.Fragment>
    <fieldset>
      <legend>
        <h3>Style</h3>
      </legend>
      <Flex column={true}>
        <Label htmlFor="style">Typography</Label>
        <Field component={InputField} name="options.style" />
      </Flex>
      <Flex column={true}>
        <Label htmlFor="style">Zoom</Label>
        <Field component={InputField} name="options.initialZoom" />
      </Flex>
      <Flex column={true}>
        <Label htmlFor="style">Max Zoom</Label>
        <Field component={InputField} name="options.maxZoom" />
      </Flex>
      <Flex column={true}>
        <Label htmlFor="style">Min Zoom</Label>
        <Field component={InputField} name="options.minZoom" />
      </Flex>
      <Flex column={true}>
        <h4>Default Center</h4>
        <Flex row={true}>
          <Flex column={true}>
            <Label htmlFor="options.center[0].lat">Latitude:</Label>
            <Field
              component={InputField}
              type="text"
              name="options.center.lat"
              defaultValue={30.2}
            />
          </Flex>
          <Flex column={true}>
            <Label htmlFor="options.center[0.lng]">Longitude:</Label>
            <Field
              component={InputField}
              type="text"
              name="options.center.lng"
              defaultValue={-3.2}
            />
          </Flex>
        </Flex>
      </Flex>
      <Button>Update Style</Button>
    </fieldset>
    <fieldset>
      <legend>
        <h3>Embed</h3>
      </legend>
      <Field component={InputField} type="textarea" name="embed" />
    </fieldset>
  </React.Fragment>
)
