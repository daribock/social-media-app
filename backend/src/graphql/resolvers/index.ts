import postsResolvers from './posts';
import commentsResolvers from './comments';
import usersResolvers from './users';
import { Post } from '../../generated/generated-types';

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
