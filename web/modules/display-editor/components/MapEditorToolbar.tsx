import * as React from 'react'
import { Flex, Tabs, Block } from 'reakit'
import { MdLayers, MdSettings, MdStyle, MdWidgets } from 'react-icons/md'

import * as MapForms from '../forms'

import ToolBarButton from '../../../components/ToolBarButton'

const MenuItems = [
  {
    icon: MdSettings,
    tooltip: 'Options',
    tab: 'options',
    form: MapForms.OptionsForm,
  },
  {
    icon: MdWidgets,
    tooltip: 'UI Components',
    tab: 'components',
    form: MapForms.UIForm,
  },
  {
    icon: MdLayers,
    tooltip: 'Layer Groups',
    tab: 'layers',
    form: MapForms.LayersForm,
  },
  {
    icon: MdStyle,
    tooltip: 'Styles',
    tab: 'style',
    form: MapForms.StyleForm,
  },
]

const MapEditorToolbar = props => (
  <Tabs.Container style={{ display: 'fixed', left: 0 }}>
    {tabs => (
      <Flex row={true}>
        <Flex column={true} backgroundColor="black">
          <Tabs>
            {MenuItems.map((menuItem, i) => (
              <Tabs.Tab
                key={`${menuItem.tab}-${i}`}
                tab={menuItem.tab}
                backgroundColor={tabs.current === i ? 'white' : 'transparent'}
                {...tabs}
              >
                <ToolBarButton
                  icon={menuItem.icon}
                  tooltip={menuItem.tooltip}
                  color={tabs.current === i ? 'black' : 'white'}
                  height={"2rem"}
                />
              </Tabs.Tab>
            ))}
          </Tabs>
        </Flex>
        <Flex column={true}>
          <Block padding="1rem .5rem">
            {MenuItems.map((menuItem, i) => (
              <Tabs.Panel key={`tab-panel-${i}`} tab={menuItem.tab} {...tabs}>
                <Block>
                  <menuItem.form fade={true} {...props} />
                </Block>
              </Tabs.Panel>
            ))}
          </Block>
        </Flex>
      </Flex>
    )}
  </Tabs.Container>
)

export default MapEditorToolbar
