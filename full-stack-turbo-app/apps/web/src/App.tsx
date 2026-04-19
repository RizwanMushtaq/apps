import { gql, type TypedDocumentNode } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { useState } from 'react';
import type { GetTodosQuery } from './types/__generated__/graphql';
import { SaveTodoForm } from './AddTodoForm';

const GET_TODOS_QUERY: TypedDocumentNode<GetTodosQuery> = gql`
    query GetTodos {
        todos {
            id
            title
            description
            status
        }
    }
`;

function App() {
    const [showForm, setShowForm] = useState(false);

    const { loading, error, data } = useQuery<GetTodosQuery>(GET_TODOS_QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!data) return <p>No data found</p>;

    return (
        <>
            <div className="flex flex-col  items-center bg-gray-800 text-gray-300 min-h-screen ">
                <h1 className="text-4xl mb-8">Todos App</h1>

                <button
                    onClick={() => setShowForm(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md w-sm"
                >
                    Add Todo
                </button>
                {showForm && <SaveTodoForm showForm={showForm} setShowForm={setShowForm} />}

                <div className="flex flex-wrap justify-center mt-8">
                    {data.todos.map((todo) => (
                        <div
                            key={todo.id}
                            className="bg-gray-700 p-4 rounded-md m-2 w-full max-w-md"
                        >
                            <h2 className="text-2xl font-bold">{todo.title}</h2>
                            <p>{todo.description}</p>
                            <p>Status: {todo.status}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default App;
