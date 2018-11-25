import * as React from 'react'
import { css, Provider as ThemeProvider } from 'reakit'
import reakitThemeDefault from 'reakit-theme-default'

import MapApp from '../modules/map/MapApp'
import MapEditForm from '../modules/display-editor/MapEditForm'

interface MapEditPageProps {
  router: {
    query: {
      id: String
    }
  }
}

const EditorTheme = {
  palette: {
    primary: ['darkred', 'red', 'lightred'],
    primaryText: ['white', 'white', 'black'],
  },
  Button: css`
    border-radius: 0;
    background-color: darkblue;
    border: 0 none;
    color: white;
  `,
  Tabs: css`
    flex-direction: column;
    background-color: black;
    color: white;
    align-items: center;
  `,
  TabsTab: css`
    display: block;
    position: relative;
    flex: 1;
    padding: 1rem 0.2rem;
    user-select: none;
    outline: none;
    align-items: center;
    white-space: nowrap;
    justify-content: center;
    text-decoration: none;
    min-height:4rem;
    height: 3em;
    min-width: 2.5em;
    &.active {
      font-weight: bold;
    }
    &[disabled] {
      pointer-events: none;
    }
  `,
}

export default (props: MapEditPageProps) => {
  return (
    <MapApp><ThemeProvider theme={{ ...reakitThemeDefault, ...EditorTheme }}>
        <MapEditForm displayId={props.router && props.router.query.id} />
      </ThemeProvider>
    </MapApp>
  )
}
