import { AuthenticationError, UserInputError } from 'apollo-server';
import {
    MutationCreatePostArgs,
    MutationDeletePostArgs,
    MutationLikePostArgs,
    QueryGetPostArgs,
    Resolvers,
} from '../../generated/generated-types';
import Post from '../../models/Post';
import checkAuth from '../../utils/check-auth';

const getPosts = async () => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
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

const createPost = async (_: any, { createPostInput }: MutationCreatePostArgs, context: any) => {
    const { body } = createPostInput;
    const user = checkAuth(context);

    if (body.trim() === '') {
        throw new UserInputError('Post body must not be empty');
    }

    const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
    });

    const post = await newPost.save();

    return post;
};

const deletePost = async (_: any, { postId }: MutationDeletePostArgs, context: any) => {
    const user = checkAuth(context);

    try {
        const post = await Post.findById(postId);

        if (post) {
            if (user.username === post.username) {
                await post.deleteOne();
                return 'Post deleted successfully';
            } else {
                throw new AuthenticationError('Action not allowed');
            }
        } else {
            throw new AuthenticationError('Post id is wrong');
        }
    } catch (err) {
        throw new Error(err as string);
    }
};

/**
 * Like and unlike posts
 *
 * Like a post if not liked yet
 * Unlike a post if alredy liked
 *
 * One Mutation two functionalities
 * @returns The changed post
 */
const likePost = async (_: any, { postId }: MutationLikePostArgs, context: any) => {
    const { username } = checkAuth(context);

    const post = await Post.findById(postId);

    if (post) {
        if (post.likes.find((like) => like?.username === username)) {
            // Post already liked => unlike it
            post.likes = post.likes.filter((like) => like?.username !== username);
        } else {
            // Not liked, like post
            post.likes.push({
                username,
                createdAt: new Date().toISOString(),
            });
        }

        await post.save();
        return post;
    } else {
        throw new UserInputError('Post not found');
    }
};

const postsResolver = {
    Query: { getPosts, getPost },
    Mutation: { createPost, deletePost, likePost },
};

export default postsResolver;
