/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "query GetHello {\n  getHello\n}\n\nquery GetUsers {\n  getUsers {\n    id\n    name\n    email\n  }\n}\n\nquery GetUser($id: Float!) {\n  getUser(id: $id) {\n    id\n    name\n    email\n  }\n}\n\nmutation CreateUser($createUserInput: CreateUserInput!) {\n  createUser(createUserInput: $createUserInput) {\n    id\n    name\n    email\n  }\n}\n\nmutation UpdateUser($id: Float!, $updateUserInput: UpdateUserInput!) {\n  updateUser(id: $id, updateUserInput: $updateUserInput) {\n    id\n    name\n    email\n  }\n}\n\nmutation DeleteUser($id: Float!) {\n  deleteUser(id: $id) {\n    id\n    name\n    email\n  }\n}\n\nsubscription UserCreated {\n  userCreated {\n    id\n    name\n    email\n  }\n}": typeof types.GetHelloDocument,
};
const documents: Documents = {
    "query GetHello {\n  getHello\n}\n\nquery GetUsers {\n  getUsers {\n    id\n    name\n    email\n  }\n}\n\nquery GetUser($id: Float!) {\n  getUser(id: $id) {\n    id\n    name\n    email\n  }\n}\n\nmutation CreateUser($createUserInput: CreateUserInput!) {\n  createUser(createUserInput: $createUserInput) {\n    id\n    name\n    email\n  }\n}\n\nmutation UpdateUser($id: Float!, $updateUserInput: UpdateUserInput!) {\n  updateUser(id: $id, updateUserInput: $updateUserInput) {\n    id\n    name\n    email\n  }\n}\n\nmutation DeleteUser($id: Float!) {\n  deleteUser(id: $id) {\n    id\n    name\n    email\n  }\n}\n\nsubscription UserCreated {\n  userCreated {\n    id\n    name\n    email\n  }\n}": types.GetHelloDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetHello {\n  getHello\n}\n\nquery GetUsers {\n  getUsers {\n    id\n    name\n    email\n  }\n}\n\nquery GetUser($id: Float!) {\n  getUser(id: $id) {\n    id\n    name\n    email\n  }\n}\n\nmutation CreateUser($createUserInput: CreateUserInput!) {\n  createUser(createUserInput: $createUserInput) {\n    id\n    name\n    email\n  }\n}\n\nmutation UpdateUser($id: Float!, $updateUserInput: UpdateUserInput!) {\n  updateUser(id: $id, updateUserInput: $updateUserInput) {\n    id\n    name\n    email\n  }\n}\n\nmutation DeleteUser($id: Float!) {\n  deleteUser(id: $id) {\n    id\n    name\n    email\n  }\n}\n\nsubscription UserCreated {\n  userCreated {\n    id\n    name\n    email\n  }\n}"): (typeof documents)["query GetHello {\n  getHello\n}\n\nquery GetUsers {\n  getUsers {\n    id\n    name\n    email\n  }\n}\n\nquery GetUser($id: Float!) {\n  getUser(id: $id) {\n    id\n    name\n    email\n  }\n}\n\nmutation CreateUser($createUserInput: CreateUserInput!) {\n  createUser(createUserInput: $createUserInput) {\n    id\n    name\n    email\n  }\n}\n\nmutation UpdateUser($id: Float!, $updateUserInput: UpdateUserInput!) {\n  updateUser(id: $id, updateUserInput: $updateUserInput) {\n    id\n    name\n    email\n  }\n}\n\nmutation DeleteUser($id: Float!) {\n  deleteUser(id: $id) {\n    id\n    name\n    email\n  }\n}\n\nsubscription UserCreated {\n  userCreated {\n    id\n    name\n    email\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;