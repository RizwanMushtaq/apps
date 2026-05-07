import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

const httpUri = import.meta.env.VITE_API_GRAPHQL_URI;
const wsUri = httpUri.replace(/^http/, 'ws');

const httpLink = new HttpLink({ uri: httpUri });
const wsLink = new GraphQLWsLink(
    createClient({
        url: wsUri,
    }),
);

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')!).render(
    <ApolloProvider client={client}>
        <StrictMode>
            <App />
        </StrictMode>
    </ApolloProvider>,
);
