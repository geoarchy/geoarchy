import App, { Container } from "next/app";
import * as React from "react";
import withApolloClient from "../lib/with-apollo-client";
import { ApolloProvider } from "react-apollo";

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient, ...etc } = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} {...etc}>
            {this.props.children}
          </Component>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
