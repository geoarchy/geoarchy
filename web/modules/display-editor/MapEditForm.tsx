import * as React from "react";
import { Formik, Form, Field } from "formik";
import { Button, Flex, Block, Group, Tabs } from "reakit";

import MapApp from "../map/MapApp";
import MapDisplay from "../map/MapDisplay";
import { mapDisplay1 } from "../../fixtures";
import * as MapForms from "./forms";
import Header from "../../components/Header";

const FormTabContainer = props => (
  <Tabs.Container>
    {tabs => (
      <Block>
        <Tabs>
          <Tabs.Tab tab="options" {...tabs}>
            Options
          </Tabs.Tab>
          <Tabs.Tab tab="ui" {...tabs}>
            UI
          </Tabs.Tab>
          <Tabs.Tab tab="layers" {...tabs}>
            Layers
          </Tabs.Tab>
          <Tabs.Tab tab="layers" {...tabs}>
            Styles
          </Tabs.Tab>
        </Tabs>
        <Tabs.Panel fade slideIn tab="options" {...tabs}>
          <Block fade>
            <MapForms.OptionsForm fade {...props} />
          </Block>
        </Tabs.Panel>
        <Tabs.Panel fade tab="ui" {...tabs}>
          <Block fade>
            <MapForms.UIForm fade {...props} />
          </Block>
        </Tabs.Panel>
        <Tabs.Panel fade tab="layers" {...tabs}>
          <Block fade>
            <MapForms.LayersForm fade {...props} />
          </Block>
        </Tabs.Panel>
      </Block>
    )}
  </Tabs.Container>
);

export default class MapEditForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      saved: true,
      published: props.published || false
    };
  }
  static defaultProps = mapDisplay1;
  render() {
    return (
      <MapApp>
        <style jsx global>{`
          .map-edit label {
            font-size: 1.1rem;
            padding-bottom: 0.2rem;
          }
          .map-edit input,
          .map-edit textarea {
            border: 1px solid #444;
            font-size: 1.1rem;
            padding: 0.5rem;
            margin-bottom: 0.6rem;
          }
          form,
          fieldset,
          legend {
            margin: 0;
            padding: 0;
          }
          form fieldset {
            border: none;
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
                  <Header />
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
                        <Button
                          style={{
                            backgroundColor: unpublished ? "red" : "green"
                          }}
                        >
                          {unsaved ? "Unsaved" : "Saved"}
                        </Button>
                        <Button
                          style={{
                            backgroundColor: unpublished ? "yellow" : "green",
                            color: unpublished ? "black" : "white"
                          }}
                        >
                          {unpublished ? "Unpublished" : "Published"}
                        </Button>
                      </Group>
                      <Flex column>
                        <FormTabContainer {...props} />
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
