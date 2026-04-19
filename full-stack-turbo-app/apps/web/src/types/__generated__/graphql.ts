export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateTodoInput = {
  description: Scalars['String']['input'];
  status: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type Mutation = {
  __typename: 'Mutation';
  createTodo: Todo;
  deleteTodo: Scalars['Boolean']['output'];
  updateTodo: Todo;
};


export type MutationCreateTodoArgs = {
  createTodoInput: CreateTodoInput;
};


export type MutationDeleteTodoArgs = {
  id: Scalars['Float']['input'];
};


export type MutationUpdateTodoArgs = {
  id: Scalars['Float']['input'];
  updateTodoInput: UpdateTodoInput;
};

export type Query = {
  __typename: 'Query';
  todos: Array<Todo>;
};

export type Todo = {
  __typename: 'Todo';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  status: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type UpdateTodoInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CreateTodoMutationVariables = Exact<{
  createTodoInput: CreateTodoInput;
}>;


export type CreateTodoMutation = { createTodo: { __typename: 'Todo', id: string, title: string, description: string, status: string } };

export type GetTodosQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTodosQuery = { todos: Array<{ __typename: 'Todo', id: string, title: string, description: string, status: string }> };
