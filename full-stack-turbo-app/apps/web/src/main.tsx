import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

console.log('GraphQL Endpoint:', import.meta.env.VITE_GRAPHQL_ENDPOINT);

const client = new ApolloClient({
    link: new HttpLink({ uri: import.meta.env.VITE_GRAPHQL_ENDPOINT }),
    cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </StrictMode>,
);
