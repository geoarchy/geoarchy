import * as React from 'react'
import { Input } from 'reakit'

const asFields = ['textarea', 'select']

export const InputField = ({
    field, // { name, value, onChange, onBlur }
    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...props
}) => (
    <div>
        <Input
            as={props.type && asFields.includes(props.type) && props.type}
            {...field}
            {...props}
        />
        {touched[field.name] &&
            errors[field.name] && (
                <div className="error">{errors[field.name]}</div>
            )}
    </div>
)
