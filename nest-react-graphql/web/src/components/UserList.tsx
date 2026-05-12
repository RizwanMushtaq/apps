import React from 'react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface UserListProps {
    users: User[];
    editId: number | null;
    editName: string;
    editEmail: string;
    updateLoading: boolean;
    onEditClick: (user: User) => void;
    onEditNameChange: (value: string) => void;
    onEditEmailChange: (value: string) => void;
    onUpdateUser: (e: React.FormEvent<HTMLFormElement>) => void;
    onCancelEdit: () => void;
}

const UserList: React.FC<UserListProps> = ({
    users,
    editId,
    editName,
    editEmail,
    updateLoading,
    onEditClick,
    onEditNameChange,
    onEditEmailChange,
    onUpdateUser,
    onCancelEdit,
}) => (
    <ul className="user-list">
        {users.map((user) => (
            <li key={user.id} className="user-card">
                {editId === user.id ? (
                    <form onSubmit={onUpdateUser} className="edit-user-form">
                        <input
                            type="text"
                            value={editName}
                            onChange={(e) => onEditNameChange(e.target.value)}
                            placeholder="Name"
                        />
                        <input
                            type="email"
                            value={editEmail}
                            onChange={(e) => onEditEmailChange(e.target.value)}
                            placeholder="Email"
                        />
                        <button type="submit" disabled={updateLoading}>
                            {updateLoading ? 'Updating...' : 'Update'}
                        </button>
                        <button type="button" onClick={onCancelEdit}>
                            Cancel
                        </button>
                    </form>
                ) : (
                    <>
                        <strong>{user.name}</strong>
                        <span>{user.email}</span>
                        <button
                            onClick={() => onEditClick(user)}
                            style={{ marginLeft: 8 }}
                        >
                            Edit
                        </button>
                    </>
                )}
            </li>
        ))}
    </ul>
);

export default UserList;
