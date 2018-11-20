import React from 'react'
import { Field } from 'formik'
import { Flex } from 'reakit'

export default props => (
    <fieldset>
        <legend>
            <h3>Components</h3>
        </legend>
        {props.values.components.map((C, i) => {
            return (
                <React.Fragment>
                    <Flex row>
                        <Flex column>
                            <h3>{C._id}</h3>
                            <label htmlFor={`components[${i}].type`}>
                                Type
                            </label>
                            <Field type="text" name={`components[${i}].type`} />
                        </Flex>
                    </Flex>
                    <Flex row>
                        <Flex column>
                            <label htmlFor={`components[${i}].region`}>
                                Region
                            </label>
                            <Field
                                type="text"
                                name={`components[${i}].region`}
                            />
                        </Flex>
                        <Flex column>
                            <label htmlFor={`components[${i}].ariaLabel`}>
                                Aria Label
                            </label>
                            <Field
                                type="text"
                                name={`components[${i}].ariaLabel`}
                            />
                        </Flex>
                    </Flex>
                </React.Fragment>
            )
        })}
    </fieldset>
)
