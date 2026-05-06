import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

const client = new ApolloClient({
    link: new HttpLink({ uri: import.meta.env.VITE_API_GRAPHQL_URI }),
    cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')!).render(
    <ApolloProvider client={client}>
        <StrictMode>
            <App />
        </StrictMode>
    </ApolloProvider>,
);
