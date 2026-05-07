import { useMutation } from '@apollo/client/react';
import './App.css';
import {
    CreateUserDocument,
    type CreateUserMutation,
    type CreateUserMutationVariables,
} from './generated/graphql';

function App() {
    const [createUser, { data, loading, error }] = useMutation<
        CreateUserMutation,
        CreateUserMutationVariables
    >(CreateUserDocument);

    const onCreateUser = () => {
        console.log('Create User button clicked');
        createUser({
            variables: {
                createUserInput: {
                    name: 'John Doe',
                    email: 'john.doe@example.com',
                },
            },
        });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <h1>Testing Apollo Client</h1>
            {data?.createUser && (
                <p>
                    {data.createUser.name} with email {data.createUser.email}{' '}
                    created successfully!
                </p>
            )}

            <button onClick={onCreateUser}>Create User</button>
        </>
    );
}

export default App;
