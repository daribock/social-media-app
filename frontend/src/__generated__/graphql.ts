/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string };
    String: { input: string; output: string };
    Boolean: { input: boolean; output: boolean };
    Int: { input: number; output: number };
    Float: { input: number; output: number };
};

export type Comment = {
    __typename?: 'Comment';
    body: Scalars['String']['output'];
    createdAt: Scalars['String']['output'];
    id: Scalars['ID']['output'];
    username: Scalars['String']['output'];
};

export type CreatePostInput = {
    body: Scalars['String']['input'];
};

export enum IssueSeverity {
    Error = 'ERROR',
    Info = 'INFO',
}

export type Like = {
    __typename?: 'Like';
    createdAt: Scalars['String']['output'];
    id: Scalars['ID']['output'];
    username: Scalars['String']['output'];
};

export type LoginInput = {
    password: Scalars['String']['input'];
    username: Scalars['String']['input'];
};

export type Mutation = {
    __typename?: 'Mutation';
    createComment: Post;
    createPost: Post;
    deleteComment: Post;
    deletePost: Scalars['String']['output'];
    likePost: Post;
    login: User;
    register: User;
};

export type MutationCreateCommentArgs = {
    body: Scalars['String']['input'];
    postId: Scalars['ID']['input'];
};

export type MutationCreatePostArgs = {
    createPostInput: CreatePostInput;
};

export type MutationDeleteCommentArgs = {
    commentId: Scalars['ID']['input'];
    postId: Scalars['ID']['input'];
};

export type MutationDeletePostArgs = {
    postId: Scalars['ID']['input'];
};

export type MutationLikePostArgs = {
    postId: Scalars['ID']['input'];
};

export type MutationLoginArgs = {
    loginInput: LoginInput;
};

export type MutationRegisterArgs = {
    registerInput: RegisterInput;
};

export type Post = {
    __typename?: 'Post';
    body: Scalars['String']['output'];
    commentCount: Scalars['Int']['output'];
    comments: Array<Maybe<Comment>>;
    createdAt: Scalars['String']['output'];
    id: Scalars['ID']['output'];
    likeCount: Scalars['Int']['output'];
    likes: Array<Maybe<Like>>;
    username: Scalars['String']['output'];
};

export type Query = {
    __typename?: 'Query';
    getPost?: Maybe<Post>;
    getPosts: Array<Post>;
};

export type QueryGetPostArgs = {
    postId: Scalars['ID']['input'];
};

export type RegisterInput = {
    confirmPassword: Scalars['String']['input'];
    email: Scalars['String']['input'];
    password: Scalars['String']['input'];
    username: Scalars['String']['input'];
};

export type User = {
    __typename?: 'User';
    createdAt: Scalars['String']['output'];
    email: Scalars['String']['output'];
    id: Scalars['ID']['output'];
    token: Scalars['String']['output'];
    username: Scalars['String']['output'];
};

export type ValidationIssue = {
    __typename?: 'ValidationIssue';
    location?: Maybe<Scalars['String']['output']>;
    message: Scalars['String']['output'];
    severity: IssueSeverity;
};

export type ValidationResult = {
    __typename?: 'ValidationResult';
    hasErrors: Scalars['Boolean']['output'];
    issues: Array<ValidationIssue>;
};

export type GetPostsQueryVariables = Exact<{ [key: string]: never }>;

export type GetPostsQuery = {
    __typename?: 'Query';
    getPosts: Array<{
        __typename?: 'Post';
        id: string;
        body: string;
        createdAt: string;
        username: string;
        likeCount: number;
        commentCount: number;
        likes: Array<{ __typename?: 'Like'; username: string } | null>;
        comments: Array<{ __typename?: 'Comment'; createdAt: string; username: string } | null>;
    }>;
};

export const GetPostsDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'GetPosts' },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'getPosts' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'body' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'likeCount' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'commentCount' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'likes' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [{ kind: 'Field', name: { kind: 'Name', value: 'username' } }],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'comments' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<GetPostsQuery, GetPostsQueryVariables>;
