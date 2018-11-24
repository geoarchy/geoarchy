import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost'
import fetch from 'isomorphic-unfetch'


let linkUri = "http://localhost:8080"
if (process){
  const { APOLLO_BROWSER_URL, APOLLO_SERVER_URL } = process.env
  let linkUri = APOLLO_BROWSER_URL || "http://localhost:8080"

  if (!process.browser) {
    linkUri = APOLLO_SERVER_URL || linkUri
    global.fetch = fetch
  }
  
}
let apolloClient = null


// Polyfill fetch() on the server (used by apollo-client)

function create(initialState): ApolloClient<any> {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: new HttpLink({
      uri: linkUri, // Server URL (must be absolute)
      // credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    }),
    cache: new InMemoryCache().restore(initialState || {}),
  })
}

export default function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  return apolloClient
}
