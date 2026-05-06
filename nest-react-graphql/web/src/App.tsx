import { useQuery } from '@apollo/client/react';
import './App.css';
import {
    GetHelloDocument,
    type GetHelloQuery,
    type GetHelloQueryVariables,
} from './generated/graphql';

function App() {
    const { loading, error, data } = useQuery<
        GetHelloQuery,
        GetHelloQueryVariables
    >(GetHelloDocument);

    console.log({ loading, error, data });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <h1>Testing Apollo Client</h1>
            {data?.getHello && <p>{data.getHello}</p>}
        </>
    );
}

export default App;
