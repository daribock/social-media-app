import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string };
    String: { input: string; output: string };
    Boolean: { input: boolean; output: boolean };
    Int: { input: number; output: number };
    Float: { input: number; output: number };
};

export enum IssueSeverity {
    Error = 'ERROR',
    Info = 'INFO',
}

export type LoginInput = {
    password: Scalars['String']['input'];
    username: Scalars['String']['input'];
};

export type Mutation = {
    __typename?: 'Mutation';
    login: User;
    register: User;
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
    createdAt: Scalars['String']['output'];
    id: Scalars['ID']['output'];
    username: Scalars['String']['output'];
};

export type Query = {
    __typename?: 'Query';
    getPosts?: Maybe<Array<Maybe<Post>>>;
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

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
    | ResolverFn<TResult, TParent, TContext, TArgs>
    | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
    resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
    | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
    | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
    | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
    | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
    parent: TParent,
    context: TContext,
    info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
    obj: T,
    context: TContext,
    info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
    next: NextResolverFn<TResult>,
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
    Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
    ID: ResolverTypeWrapper<Scalars['ID']['output']>;
    IssueSeverity: IssueSeverity;
    LoginInput: LoginInput;
    Mutation: ResolverTypeWrapper<{}>;
    Post: ResolverTypeWrapper<Post>;
    Query: ResolverTypeWrapper<{}>;
    RegisterInput: RegisterInput;
    String: ResolverTypeWrapper<Scalars['String']['output']>;
    User: ResolverTypeWrapper<User>;
    ValidationIssue: ResolverTypeWrapper<ValidationIssue>;
    ValidationResult: ResolverTypeWrapper<ValidationResult>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
    Boolean: Scalars['Boolean']['output'];
    ID: Scalars['ID']['output'];
    LoginInput: LoginInput;
    Mutation: {};
    Post: Post;
    Query: {};
    RegisterInput: RegisterInput;
    String: Scalars['String']['output'];
    User: User;
    ValidationIssue: ValidationIssue;
    ValidationResult: ValidationResult;
};

export type MutationResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = {
    login?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'loginInput'>>;
    register?: Resolver<
        ResolversTypes['User'],
        ParentType,
        ContextType,
        RequireFields<MutationRegisterArgs, 'registerInput'>
    >;
};

export type PostResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post'],
> = {
    body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
    getPosts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Post']>>>, ParentType, ContextType>;
};

export type UserResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User'],
> = {
    createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ValidationIssueResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['ValidationIssue'] = ResolversParentTypes['ValidationIssue'],
> = {
    location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    severity?: Resolver<ResolversTypes['IssueSeverity'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ValidationResultResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes['ValidationResult'] = ResolversParentTypes['ValidationResult'],
> = {
    hasErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    issues?: Resolver<Array<ResolversTypes['ValidationIssue']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
    Mutation?: MutationResolvers<ContextType>;
    Post?: PostResolvers<ContextType>;
    Query?: QueryResolvers<ContextType>;
    User?: UserResolvers<ContextType>;
    ValidationIssue?: ValidationIssueResolvers<ContextType>;
    ValidationResult?: ValidationResultResolvers<ContextType>;
};
