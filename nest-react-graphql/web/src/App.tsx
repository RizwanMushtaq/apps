import { useMemo, useState } from 'react';
import { useMutation, useQuery, useSubscription } from '@apollo/client/react';
import './App.css';
import {
    CreateUserDocument,
    GetUsersDocument,
    UserCreatedDocument,
    type CreateUserMutation,
    type CreateUserMutationVariables,
    type GetUsersQuery,
    type UserCreatedSubscription,
} from './generated/graphql';

function App() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const {
        data: usersData,
        loading: usersLoading,
        error: usersError,
    } = useQuery<GetUsersQuery>(GetUsersDocument);

    const [createUser, { loading, error }] = useMutation<
        CreateUserMutation,
        CreateUserMutationVariables
    >(CreateUserDocument, {
        refetchQueries: [{ query: GetUsersDocument }],
        awaitRefetchQueries: true,
    });

    const { data: subscriptionData } =
        useSubscription<UserCreatedSubscription>(UserCreatedDocument);

    const latestCreatedUser = useMemo(() => {
        return subscriptionData?.userCreated;
    }, [subscriptionData]);

    const fetchedUsers = usersData?.getUsers ?? [];
    const users =
        latestCreatedUser &&
        !fetchedUsers.some((user) => user.id === latestCreatedUser.id)
            ? [...fetchedUsers, latestCreatedUser]
            : fetchedUsers;

    const onCreateUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const trimmedName = name.trim();
        const trimmedEmail = email.trim();

        if (!trimmedName || !trimmedEmail) {
            return;
        }

        await createUser({
            variables: {
                createUserInput: {
                    name: trimmedName,
                    email: trimmedEmail,
                },
            },
        });

        setName('');
        setEmail('');
    };

    if (usersLoading) return <p>Loading users...</p>;
    if (usersError) return <p>Error loading users: {usersError.message}</p>;

    return (
        <main className="app-shell">
            <section className="panel">
                <h1>User Management</h1>
                <form className="user-form" onSubmit={onCreateUser}>
                    <label>
                        <span>Name</span>
                        <input
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="Enter user name"
                        />
                    </label>

                    <label>
                        <span>Email</span>
                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="Enter user email"
                        />
                    </label>

                    <button disabled={loading} type="submit">
                        {loading ? 'Creating...' : 'Create User'}
                    </button>
                </form>

                {error && (
                    <p className="status error">Error: {error.message}</p>
                )}

                {latestCreatedUser && (
                    <p className="status success">
                        Latest user {latestCreatedUser.name} with email{' '}
                        {latestCreatedUser.email} created successfully!
                    </p>
                )}

                <h2>Users</h2>
                <ul className="user-list">
                    {users.map((user) => (
                        <li key={user.id} className="user-card">
                            <strong>{user.name}</strong>
                            <span>{user.email}</span>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default App;
