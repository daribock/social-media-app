import { AuthenticationError } from 'apollo-server';
import { MutationCreatePostArgs, MutationDeletePostArgs, QueryGetPostArgs } from '../../generated/graphql.js';
import Post from '../../models/Post.js';
import checkAuth from '../../utils/check-auth.js';

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

const postsResolver = {
    Query: { getPosts, getPost },
    Mutation: { createPost, deletePost },
};

export default postsResolver;
