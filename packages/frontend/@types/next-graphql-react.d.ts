declare module 'next-graphql-react' {
  type GraphQLAppProps = {
    graphqlCache: object;
    graphql: GraphQL;
  }
  
  export function withGraphQLApp(App: App): React.Component<GraphQLAppProps>;
}