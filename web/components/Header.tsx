import * as React from 'react'
import { MdMenu, MdCreate } from 'react-icons/md'
import { withRouter } from 'next/router'
import { Toolbar, Heading, Avatar, Flex, Tooltip } from 'reakit'

import ToolBarButton from './ToolBarButton'

const styles = {
  heading: {
    fontSize: '2em',
    margin: '0',
    fontVariant: 'all-small-caps historical-ligatures slashed-zero',
    fontWeight: 200,
    letterSpacing: '.2rem',
    color: 'white',
  },
}

const Header = () => (
  <Toolbar background="black" gutter="8px 16px">
    <Flex row={true}>
      <Toolbar.Content align="start" gutter="8px 16px">
        <ToolBarButton icon={MdMenu} tooltip="Menu" fontSize={24} />
      </Toolbar.Content>
      <Toolbar.Content gutter="8px 16px">
        <ToolBarButton icon={MdCreate} tooltip="Editor" fontSize={24} />
      </Toolbar.Content>
    </Flex>
    <Toolbar.Content align="center">
      <Heading {...styles.heading}>GEOARCHY</Heading>
    </Toolbar.Content>
    <Toolbar.Content align="end">
      <Toolbar.Focusable as={Avatar} src="https://placekitten.com/150/200" />
      <Tooltip>Account Settings</Tooltip>
    </Toolbar.Content>
  </Toolbar>
)

export default withRouter(Header)
