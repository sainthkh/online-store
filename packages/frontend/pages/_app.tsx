import React from 'react'
import App, { Container } from 'next/app'
import { withGraphQLApp } from 'next-graphql-react'
import { GraphQL, GraphQLProvider } from 'graphql-react'
import Page from '../components/Page'

interface MyAppProps {
  graphql: GraphQL
}

class MyApp extends App<MyAppProps, {}> {
  render() {
    const { Component, graphql, pageProps } = this.props

    return (
      <Container>
        <GraphQLProvider graphql={graphql}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </GraphQLProvider>
      </Container>
    )
  }
}

export default withGraphQLApp(MyApp)
