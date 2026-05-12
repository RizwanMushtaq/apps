import React from 'react';

interface UserFormProps {
    name: string;
    email: string;
    loading: boolean;
    onNameChange: (value: string) => void;
    onEmailChange: (value: string) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const UserForm: React.FC<UserFormProps> = ({
    name,
    email,
    loading,
    onNameChange,
    onEmailChange,
    onSubmit,
}) => (
    <form className="user-form" onSubmit={onSubmit}>
        <label>
            <span>Name</span>
            <input
                type="text"
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
                placeholder="Enter user name"
            />
        </label>
        <label>
            <span>Email</span>
            <input
                type="email"
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
                placeholder="Enter user email"
            />
        </label>
        <button disabled={loading} type="submit">
            {loading ? 'Creating...' : 'Create User'}
        </button>
    </form>
);

export default UserForm;
