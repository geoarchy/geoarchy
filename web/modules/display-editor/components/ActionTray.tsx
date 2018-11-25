import * as React from 'react'
import styled from 'styled-components'
import { Block, Toolbar } from 'reakit'
import { MdLayers } from 'react-icons/md'

interface ActionTrayProps {
  title?: String
  name?: String
  renderActions?: Function
  isParent?: Boolean
}

const ActionTitle = styled.h4`
  color: #eee;
  padding: 0.5rem;
  margin: 0;
`

interface ActionTrayState {
  visible: boolean
}

export default class ActionTray extends React.Component<
  ActionTrayProps,
  ActionTrayState
> {
  constructor(props, state) {
    super(props, state)
    this.state = {
      visible: false,
    }
    this.toggleVisible = this.toggleVisible.bind(this)
  }
  toggleVisible(currentVisibility) {
    this.setState({ visible: !currentVisibility })
  }
  render() {
    const { title, name, renderActions, children, isParent } = this.props
    return (
      <Block
        className="action-tray"
        width="100%"
        marginLeft={isParent ? 0 : 10}
        marginBottom={10}
      >
        <Toolbar
          background="black"
          gutter="4px 10px"
          marginBottom="1rem"
          onClick={e => {
            e.preventDefault()
            this.toggleVisible(this.state.visible)
          }}
        >
          <Toolbar.Content
            align="start"
            width="80%"
            row={true}
            gridAutoColumns="max-content"
          >
            <ActionTitle>
              <MdLayers />
              <span>{title}</span>
              <span>{name && `${name}`}</span>
            </ActionTitle>
          </Toolbar.Content>

          <Toolbar.Content align="end">
            {renderActions && renderActions(this.props)}
          </Toolbar.Content>
        </Toolbar>
        {this.state.visible && children}
      </Block>
    )
  }
}
