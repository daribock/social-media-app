import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@material-tailwind/react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import App from './App';
import { AuthProvider } from './context/auth';

// Creating an HTTP link for the Apollo client to communicate with the GraphQL server
const httpLink = createHttpLink({
    uri: `${import.meta.env.VITE_REACT_APP_GRAPHQL_PATH}`,
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <ThemeProvider>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </ThemeProvider>
        </ApolloProvider>
    </React.StrictMode>
);
