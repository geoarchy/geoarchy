import React from "react";
import { MdMenu, MdCreate } from "react-icons/md";
import { withRouter } from "next/router";
import {
  Toolbar,
  Heading,
  Avatar,
  Flex,
  Tooltip,
  Button,
} from "reakit";

const styles = {
  heading: {
    fontSize: "2em",
    margin: "0",
    fontVariant: "all-small-caps historical-ligatures slashed-zero",
    fontWeight: 200,
    letterSpacing: ".2rem",
    color: "white"
  },
  toolbarButton: {
    backgroundColor: "transparent",
    border: "0 none",
    borderRadius: 0,
    outline: "none",
    color: "white"
  }
};

const ToolbarButton = ({ icon, tooltip }) => (
  <React.Fragment>
    <Button {...styles.toolbarButton}>
      <Toolbar.Focusable as={icon} fontSize={24} />
    </Button>
    <Tooltip>{tooltip}</Tooltip>
  </React.Fragment>
);

const Header = () => (
  <Toolbar background="black" gutter="8px 16px">
    <Flex row>
      <Toolbar.Content align="start" gutter="8px 16px">
        <ToolbarButton icon={MdMenu} tooltip="Menu" />
      </Toolbar.Content>
      <Toolbar.Content gutter="8px 16px">
        <ToolbarButton icon={MdCreate} tooltip="Editor" />
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
);

export default withRouter(Header);
