/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
    | T
    | {
          [P in keyof T]?: P extends ' $fragmentName' | '__typename'
              ? T[P]
              : never;
      };
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string };
    String: { input: string; output: string };
    Boolean: { input: boolean; output: boolean };
    Int: { input: number; output: number };
    Float: { input: number; output: number };
};

export type CreateUserInput = {
    /** The email of the user */
    email: Scalars['String']['input'];
    /** The name of the user */
    name: Scalars['String']['input'];
};

export type Mutation = {
    __typename?: 'Mutation';
    /** Create a new user */
    createUser: User;
    /** Delete a user */
    deleteUser: User;
};

export type MutationCreateUserArgs = {
    createUserInput: CreateUserInput;
};

export type MutationDeleteUserArgs = {
    id: Scalars['Float']['input'];
};

export type Query = {
    __typename?: 'Query';
    getHello: Scalars['String']['output'];
    /** Get a user by ID */
    getUser: User;
    /** Get all users */
    getUsers: Array<User>;
};

export type QueryGetUserArgs = {
    id: Scalars['Float']['input'];
};

export type Subscription = {
    __typename?: 'Subscription';
    /** Subscribe when a user is created */
    userCreated: User;
};

export type User = {
    __typename?: 'User';
    /** The email of the user */
    email: Scalars['String']['output'];
    /** The unique identifier of the user */
    id: Scalars['Float']['output'];
    /** The name of the user */
    name: Scalars['String']['output'];
};

export type GetHelloQueryVariables = Exact<{ [key: string]: never }>;

export type GetHelloQuery = { getHello: string };

export type GetUsersQueryVariables = Exact<{ [key: string]: never }>;

export type GetUsersQuery = {
    getUsers: Array<{ id: number; name: string; email: string }>;
};

export type GetUserQueryVariables = Exact<{
    id: number;
}>;

export type GetUserQuery = {
    getUser: { id: number; name: string; email: string };
};

export type CreateUserMutationVariables = Exact<{
    createUserInput: CreateUserInput;
}>;

export type CreateUserMutation = {
    createUser: { id: number; name: string; email: string };
};

export type DeleteUserMutationVariables = Exact<{
    id: number;
}>;

export type DeleteUserMutation = {
    deleteUser: { id: number; name: string; email: string };
};

export type UserCreatedSubscriptionVariables = Exact<{ [key: string]: never }>;

export type UserCreatedSubscription = {
    userCreated: { id: number; name: string; email: string };
};

export const GetHelloDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'GetHello' },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'getHello' },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<GetHelloQuery, GetHelloQueryVariables>;
export const GetUsersDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'GetUsers' },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'getUsers' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'name' },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'email' },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;
export const GetUserDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'GetUser' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'id' },
                    },
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: { kind: 'Name', value: 'Float' },
                        },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'getUser' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'id' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'id' },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'name' },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'email' },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
export const CreateUserDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'CreateUser' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'createUserInput' },
                    },
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: { kind: 'Name', value: 'CreateUserInput' },
                        },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createUser' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: {
                                    kind: 'Name',
                                    value: 'createUserInput',
                                },
                                value: {
                                    kind: 'Variable',
                                    name: {
                                        kind: 'Name',
                                        value: 'createUserInput',
                                    },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'name' },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'email' },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const DeleteUserDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'DeleteUser' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'id' },
                    },
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: { kind: 'Name', value: 'Float' },
                        },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'deleteUser' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'id' },
                                value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'id' },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'name' },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'email' },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<DeleteUserMutation, DeleteUserMutationVariables>;
export const UserCreatedDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'subscription',
            name: { kind: 'Name', value: 'UserCreated' },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'userCreated' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'name' },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'email' },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<
    UserCreatedSubscription,
    UserCreatedSubscriptionVariables
>;
