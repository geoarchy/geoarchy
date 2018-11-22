import * as React from 'react'
import { Formik, Form, InjectedFormikProps } from 'formik'
import { Flex } from 'reakit'
import { ACCESS_TOKEN } from '../../lib/config'

import MapApp from '../map/MapApp'
import MapDisplay from '../map/MapDisplay'
import Header from '../../components/Header'
import MapEditorToolbar from './components/MapEditorToolbar'
import { withMapQuery, withMapUpdateMutation } from '../map/queries'

interface MapEditFormProps {
  displayId: String
  published: Boolean
  account: {
    accessToken: String
  }
  updateMapDisplay(TMapDisplay): Promise<any>
  data: { map: TMapDisplay }
  loading: Boolean
  error: any
}

interface MapEditFormValues extends TMapDisplay {
  hasError: Boolean
}

interface MapEditFormState {
  saved: Boolean
  published: Boolean
  activeTab: String
}

class MapEditForm extends React.Component<MapEditFormProps, MapEditFormState> {
  constructor(props, context) {
    super(props, context)
    this.state = {
      saved: true,
      published: props.published || false,
      activeTab: 'layers',
    }
  }

  static defaultProps = {
    account: {
      accessToken: ACCESS_TOKEN,
    },
  }

  render() {
    return (
      <Formik
        initialValues={this.props.data.map}
        onSubmit={async (values, actions) => {
          await this.props.updateMapDisplay(values)
          actions.setSubmitting(false)
          console.log('updating map')
        }}
      >
        {(props: InjectedFormikProps<MapEditFormProps, MapEditFormValues>) => {
          // const unsaved = !this.state.saved || props.dirty
          // const unpublished = !this.state.published || unsaved
          return (
            <Flex row>
              <Flex minWidth="500px" height="100vh" column>
                <Header />
                <div
                  style={{
                    overflow: 'scroll',
                    paddingBottom: 40,
                  }}
                >
                  <Form className="map-edit">
                    <Flex column>
                      <Flex row>
                        <MapEditorToolbar values={props.values} />
                      </Flex>
                    </Flex>
                  </Form>
                </div>
              </Flex>
              <Flex column width="100%">
                <MapDisplay
                  displayId={props.displayId}
                  loading={this.props.loading}
                  error={this.props.error}
                  debugMode={false}
                  map={props.values}
                />
              </Flex>
            </Flex>
          )
        }}
      </Formik>
    )
  }
}

const MapEditPage = props => (
  <MapApp>
    <style>{`
              .map-edit label {
                padding-bottom: 0.2rem;
              }
              .map-edit input,
              .map-edit textarea {
                border: 1px solid #444;
                padding: 0.5rem;
                margin-bottom: 0.6rem;
                font-size: .9rem;
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
    <MapEditForm {...props} />
  </MapApp>
)

const MapEditFormWithQuery = withMapUpdateMutation(withMapQuery(MapEditPage))

export default MapEditFormWithQuery
