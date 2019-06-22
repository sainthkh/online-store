import React from 'react';
import { GraphQL } from 'graphql-react';

declare module "graphql-react" {
  type ProviderProps = {
    graphql: GraphQL;
    children: React.ReactNode;
  }
  
  export function GraphQLProvider(props: ProviderProps): JSX.Element;
}
