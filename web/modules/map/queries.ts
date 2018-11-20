import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const mapFragment = `
  title
  options {
    container
    style
    initialZoom
    maxZoom
    minZoom
    center {
      lat
      lng
    }
  }
  components {
    _id
    type
    region
  }
  layerGroups {
    _id
    hideOnLoad
    label
    layers
  }
`

export const GET_DISPLAY_QUERY = gql`
  query getMap($id: String) {
    map(id: $id) {
      _id
      ${mapFragment}
    }
  }
`

export const UPDATE_DISPLAY_MUTATION = gql`
  mutation updateMapDisplay($data: TMapDisplay) {
    updateMapDisplay(data: $data) {
      _id
      ${mapFragment}
    }
  }


`

export const withMapQuery = graphql(GET_DISPLAY_QUERY, {
  options: (props: { displayId: String }) => {
    return {
      variables: {
        id: props.displayId,
      },
    }
  },
})

export const withMapUpdateMutation = graphql(UPDATE_DISPLAY_MUTATION, {
  options: (props: { displayId: String }) => {
    return {
      variables: {
        id: props.displayId,
      },
    }
  },
})