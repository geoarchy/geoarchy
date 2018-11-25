import react from 'react'
import { Field } from 'formik'
import { Flex } from 'reakit'

const UIForm = props => (
  <fieldset>
    <legend>
      <h3>Components</h3>
    </legend>
    {props.values.components &&
      props.values.components.map((C, i) => {
        return (
          <React.Fragment key={`component-${C._id}-${i}`}>
            <Flex row={true}>
              <Flex column={true}>
                <h3>{C._id}</h3>
                <label htmlFor={`components[${i}].type`}>Type</label>
                <Field type="text" name={`components[${i}].type`} />
              </Flex>
            </Flex>
            <Flex row={true}>
              <Flex column={true}>
                <label htmlFor={`components[${i}].region`}>Region</label>
                <Field type="text" name={`components[${i}].region`} />
              </Flex>
              <Flex column={true}>
                <label htmlFor={`components[${i}].ariaLabel`}>Aria Label</label>
                <Field type="text" name={`components[${i}].ariaLabel`} />
              </Flex>
            </Flex>
          </React.Fragment>
        )
      })}
  </fieldset>
)

export default UIForm
