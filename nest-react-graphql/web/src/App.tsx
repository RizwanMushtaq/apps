import { useMemo, useState } from 'react';
import { useMutation, useQuery, useSubscription } from '@apollo/client/react';
import './App.css';
import {
    CreateUserDocument,
    GetUsersDocument,
    UserCreatedDocument,
    UpdateUserDocument,
    type CreateUserMutation,
    type CreateUserMutationVariables,
    type GetUsersQuery,
    type UserCreatedSubscription,
    type UpdateUserMutation,
    type UpdateUserMutationVariables,
} from './generated/graphql';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import StatusMessage from './components/StatusMessage';

function App() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [editId, setEditId] = useState<number | null>(null);
    const [editName, setEditName] = useState('');
    const [editEmail, setEditEmail] = useState('');

    const [updateUser, { loading: updateLoading, error: updateError }] =
        useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
            UpdateUserDocument,
            {
                refetchQueries: [{ query: GetUsersDocument }],
                awaitRefetchQueries: true,
                onCompleted: () => {
                    setEditId(null);
                    setEditName('');
                    setEditEmail('');
                },
            },
        );

    const onEditClick = (user: { id: number; name: string; email: string }) => {
        setEditId(user.id);
        setEditName(user.name);
        setEditEmail(user.email);
    };

    const onUpdateUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!editId) return;
        const trimmedName = editName.trim();
        const trimmedEmail = editEmail.trim();
        if (!trimmedName || !trimmedEmail) return;
        await updateUser({
            variables: {
                id: editId,
                updateUserInput: {
                    name: trimmedName,
                    email: trimmedEmail,
                },
            },
        });
    };

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
                <UserForm
                    name={name}
                    email={email}
                    loading={loading}
                    onNameChange={setName}
                    onEmailChange={setEmail}
                    onSubmit={onCreateUser}
                />
                {error && (
                    <StatusMessage message={error.message} type="error" />
                )}
                {latestCreatedUser && (
                    <StatusMessage
                        message={`Latest user ${latestCreatedUser.name} with email ${latestCreatedUser.email} created successfully!`}
                        type="success"
                    />
                )}
                <h2>Users</h2>
                <UserList
                    users={users}
                    editId={editId}
                    editName={editName}
                    editEmail={editEmail}
                    updateLoading={updateLoading}
                    onEditClick={onEditClick}
                    onEditNameChange={setEditName}
                    onEditEmailChange={setEditEmail}
                    onUpdateUser={onUpdateUser}
                    onCancelEdit={() => setEditId(null)}
                />
                {updateError && (
                    <StatusMessage message={updateError.message} type="error" />
                )}
            </section>
        </main>
    );
}

export default App;
