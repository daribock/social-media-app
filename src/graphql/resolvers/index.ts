import postsResolvers from './posts.js';
import commentsResolvers from './comments.js';
import usersResolvers from './users.js';
import { Post } from '../../generated/graphql.js';

const resolvers = {
    Post: {
        likeCount: (parent: Post) => parent.likes.length,
        commentCount: (parent: Post) => parent.comments.length,
    },
    Query: {
        ...postsResolvers.Query,
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation,
    },
};

export default resolvers;
