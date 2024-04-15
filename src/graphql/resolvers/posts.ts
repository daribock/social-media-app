import { Mutation, MutationCreatePostArgs, QueryGetPostArgs, Resolvers } from '../../generated/graphql.js';
import Post from '../../models/Post.js';

const getPosts = async () => {
    try {
        const posts = await Post.find();
        return posts;
    } catch (err) {
        throw new Error(err as string);
    }
};

const getPost = async (_: any, { postId }: QueryGetPostArgs) => {
    try {
        const post = await Post.findById(postId);

        if (post) {
            return post;
        } else {
            throw new Error('Post not found');
        }
    } catch (err) {
        throw new Error(err as string);
    }
};

const createPost: Mutation['createPost'] = async (_: any, { body }, context) => {
    try {
        const post = await Post.findById(postId);

        if (post) {
            return post;
        } else {
            throw new Error('Post not found');
        }
    } catch (err) {
        throw new Error(err as string);
    }
};

const postsResolver = {
    Query: { getPosts, getPost },
    Mutation: {},
};

export default postsResolver;
