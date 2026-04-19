import { gql, type TypedDocumentNode } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { useState, type FC, type FormEvent } from 'react';
import type {
    CreateTodoInput,
    CreateTodoMutation,
    CreateTodoMutationVariables,
} from './types/__generated__/graphql';

const CREATE_TODO_MUTATION: TypedDocumentNode<CreateTodoMutation, CreateTodoMutationVariables> =
    gql`
        mutation CreateTodo($createTodoInput: CreateTodoInput!) {
            createTodo(createTodoInput: $createTodoInput) {
                id
                title
                description
                status
            }
        }
    `;

export const SaveTodoForm: FC<{
    showForm: boolean;
    setShowForm: (show: boolean) => void;
}> = ({ showForm, setShowForm }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('NEW');
    const [submitError, setSubmitError] = useState<string | null>(null);

    const [createTodo, { loading }] = useMutation<CreateTodoMutation, CreateTodoMutationVariables>(
        CREATE_TODO_MUTATION,
    );

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setSubmitError(null);

        const createTodoInput: CreateTodoInput = {
            title: title.trim(),
            description: description.trim(),
            status,
        };

        try {
            await createTodo({
                variables: { createTodoInput },
                refetchQueries: ['GetTodos'],
                awaitRefetchQueries: true,
            });

            setTitle('');
            setDescription('');
            setStatus('NEW');
            setShowForm(false);
        } catch (error) {
            setSubmitError(
                error instanceof Error ? error.message : 'Failed to save todo. Please try again.',
            );
        }
    };

    return (
        showForm && (
            <div className="bg-gray-700 p-4 rounded-md mt-4 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Add New Todo</h2>
                <form onSubmit={onSubmit}>
                    {submitError ? <p className="mb-4 text-red-300">{submitError}</p> : null}
                    <div className="mb-4">
                        <label className="block mb-1">Title</label>
                        <input
                            required
                            type="text"
                            className="w-full p-2 rounded-md bg-gray-600 text-gray-300"
                            value={title}
                            disabled={loading}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Description</label>
                        <textarea
                            required
                            className="w-full p-2 rounded-md bg-gray-600 text-gray-300"
                            value={description}
                            disabled={loading}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Status</label>
                        <select
                            required
                            className="w-full p-2 rounded-md bg-gray-600 text-gray-300"
                            value={status}
                            disabled={loading}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="NEW">New</option>
                            <option value="PENDING">Pending</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="COMPLETED">Completed</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-green-500 text-white rounded-md disabled:opacity-60"
                    >
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                    <button
                        type="button"
                        disabled={loading}
                        onClick={() => setShowForm(false)}
                        className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md disabled:opacity-60"
                    >
                        Cancel
                    </button>
                </form>
            </div>
        )
    );
};
