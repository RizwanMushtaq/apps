/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client/react';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Query = {
  __typename?: 'Query';
  getHello: Scalars['String']['output'];
};

export type GetHelloQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHelloQuery = { getHello: string };


export const GetHelloDocument = gql`
    query GetHello {
  getHello
}
    `;
export type GetHelloQueryResult = ApolloReactCommon.QueryResult<GetHelloQuery, GetHelloQueryVariables>;