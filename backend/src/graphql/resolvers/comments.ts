import { AuthenticationError, UserInputError } from 'apollo-server';
import { MutationCreateCommentArgs, MutationDeleteCommentArgs, Resolvers } from '../../generated/generated-types';
import Post from '../../models/Post';
import checkAuth from '../../utils/check-auth';

const createComment = async (_: any, { postId, body }: MutationCreateCommentArgs, context: any) => {
    const { username } = checkAuth(context);

    if (body.trim() === '') {
        throw new UserInputError('Empty comment', {
            errors: {
                body: 'Comment body must not be empty',
            },
        });
    }

    const post = await Post.findById(postId).catch((err) => {
        throw new UserInputError('Post not found');
    });

    if (post) {
        post.comments.unshift({
            body,
            username,
            createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
    } else {
        throw new UserInputError('Post not found');
    }
};

const deleteComment = async (_: any, { postId, commentId }: MutationDeleteCommentArgs, context: any) => {
    const { username } = checkAuth(context);

    const post = await Post.findById(postId);

    if (post) {
        const commentIndex = post.comments.findIndex((comment) => comment.id === commentId);

        if (commentIndex !== -1) {
            if (post.comments[commentIndex].username === username) {
                post.comments.splice(commentIndex, 1);
                await post.save();
                return post;
            } else {
                throw new AuthenticationError('Action not allowed');
            }
        } else {
            throw new UserInputError('Comment does not exist');
        }
    } else {
        throw new UserInputError('Post not found');
    }
};

const commentsResolvers = {
    Mutation: { createComment, deleteComment },
};

export default commentsResolvers;
