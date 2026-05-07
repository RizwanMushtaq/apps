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
import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client/react';
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
    __typename: 'Mutation';
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
    __typename: 'Query';
    getHello: Scalars['String']['output'];
    /** Get a user by ID */
    getUser: User;
    /** Get all users */
    getUsers: Array<User>;
};

export type QueryGetUserArgs = {
    id: Scalars['Float']['input'];
};

export type User = {
    __typename: 'User';
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
    getUsers: Array<{
        __typename: 'User';
        id: number;
        name: string;
        email: string;
    }>;
};

export type GetUserQueryVariables = Exact<{
    id: number;
}>;

export type GetUserQuery = {
    getUser: { __typename: 'User'; id: number; name: string; email: string };
};

export type CreateUserMutationVariables = Exact<{
    createUserInput: CreateUserInput;
}>;

export type CreateUserMutation = {
    createUser: { __typename: 'User'; id: number; name: string; email: string };
};

export type DeleteUserMutationVariables = Exact<{
    id: number;
}>;

export type DeleteUserMutation = {
    deleteUser: { __typename: 'User'; id: number; name: string; email: string };
};

export const GetHelloDocument = gql`
    query GetHello {
        getHello
    }
`;
export type GetHelloQueryResult = ApolloReactCommon.QueryResult<
    GetHelloQuery,
    GetHelloQueryVariables
>;
export const GetUsersDocument = gql`
    query GetUsers {
        getUsers {
            id
            name
            email
        }
    }
`;
export type GetUsersQueryResult = ApolloReactCommon.QueryResult<
    GetUsersQuery,
    GetUsersQueryVariables
>;
export const GetUserDocument = gql`
    query GetUser($id: Float!) {
        getUser(id: $id) {
            id
            name
            email
        }
    }
`;
export type GetUserQueryResult = ApolloReactCommon.QueryResult<
    GetUserQuery,
    GetUserQueryVariables
>;
export const CreateUserDocument = gql`
    mutation CreateUser($createUserInput: CreateUserInput!) {
        createUser(createUserInput: $createUserInput) {
            id
            name
            email
        }
    }
`;
export type CreateUserMutationResult =
    ApolloReactCommon.MutationResult<CreateUserMutation>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($id: Float!) {
        deleteUser(id: $id) {
            id
            name
            email
        }
    }
`;
export type DeleteUserMutationResult =
    ApolloReactCommon.MutationResult<DeleteUserMutation>;
