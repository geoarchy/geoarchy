import * as React from 'react'

import { Group, Button } from 'reakit'

export default (props: { unsaved: boolean; unpublished: boolean }) => (
    <Group>
        <Button
            style={{
                backgroundColor: props.unpublished ? 'red' : 'green',
            }}
            type="submit"
        >
            {props.unsaved ? 'Unsaved' : 'Saved'}
        </Button>
        <Button
            style={{
                backgroundColor: props.unpublished ? 'yellow' : 'green',
                color: props.unpublished ? 'black' : 'white',
            }}
        >
            {props.unpublished ? 'Unpublished' : 'Published'}
        </Button>
    </Group>
)
