import * as React from "react";
import { Formik, Form, Field } from "formik";
import { Flex, Box, Group, Tabs, Block } from "reakit";
import MapApp from "../map/MapApp";
import MapDisplay from "../map/MapDisplay";
import { mapDisplay1 } from "../../fixtures";
import * as MapForms from './forms';

export default class MapEditForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      saved: true,
      published: props.published || false
    };
  }
  static defaultProps = mapDisplay1
  render() {
    return (
      <MapApp>
        <style jsx global>{`
          .map-edit label {
            padding-bottom: 0.2rem;
          }
          .map-edit input {
            border: 1px solid #444;
            font-size: 1rem;
            padding: .5rem;
            margin-bottom: 0.6rem;
          }
        `}</style>
        <Formik
          initialValues={{
            style: "",
            ...this.props
          }}
        >
          {props => {
            const unsaved = !this.state.saved || props.dirty;
            const unpublished = !this.state.published || unsaved;

            return (
              <Flex row>
                <Flex width="240vh" height="100vh" column>
                  <div
                    style={{
                      padding: 20,
                      overflow: "scroll",
                      paddingBottom: 40
                    }}
                  >
                    <h2>Map Display Editor</h2>
                    <Form class="map-edit">
                      <Group>
                        <button
                          style={{
                            backgroundColor: unpublished ? "red" : "green"
                          }}
                        >
                          {unsaved ? "Unsaved" : "Saved"}
                        </button>
                        <button
                          style={{
                            backgroundColor: unpublished ? "yellow" : "green",
                            color: unpublished ? "black" : "white"
                          }}
                        >
                          {unpublished ? "Unpublished" : "Published"}
                        </button>
                      </Group>
                      <Flex column>
                      <Tabs.Container>
                        {tabs => (
                          <Block>
                            <Tabs>
                              <Tabs.Tab tab="options" {...tabs}>Options</Tabs.Tab>
                              <Tabs.Tab tab="ui" {...tabs}>UI</Tabs.Tab>
                              <Tabs.Tab tab="layers" {...tabs}>Layers</Tabs.Tab>
                            </Tabs>
                            <Tabs.Panel fade slide tab="options" {...tabs}><MapForms.OptionsForm {...props} /></Tabs.Panel>
                            <Tabs.Panel fade slide tab="ui" {...tabs}><MapForms.UIForm {...props} /></Tabs.Panel>
                            <Tabs.Panel fade slide tab="layers" {...tabs}><MapForms.LayersForm {...props} /></Tabs.Panel>
                          </Block>
                        )}
                      </Tabs.Container>
                      </Flex>
                    </Form>
                  </div>
                </Flex>
                <Flex width="760vh" column>
                  <MapDisplay {...props.values} editor />
                </Flex>
              </Flex>
            );
          }}
        </Formik>
      </MapApp>
    );
  }
}
