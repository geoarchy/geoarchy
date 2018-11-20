import * as React from 'react'
import { Button, Toolbar, Tooltip } from 'reakit'

const styles = {
  toolbarButton: {
    backgroundColor: 'transparent',
    border: '0 none',
    borderRadius: 0,
    outline: 'none',
    color: 'white',
  },
}

const ToolbarButton = ({ icon, tooltip, fontSize, ...props }) => (
  <React.Fragment>
    <Button {...styles.toolbarButton} {...props}>
      <Toolbar.Focusable as={icon} fontSize={fontSize | 24} />
    </Button>
    <Tooltip placement="right">{tooltip}</Tooltip>
  </React.Fragment>
)

export default ToolbarButton
