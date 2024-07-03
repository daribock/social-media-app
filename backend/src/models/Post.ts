import { Model, model, Schema } from 'mongoose';
import { Comment, Like, Post } from '../generated/generated-types';

interface IComment extends Omit<Comment, '__typename' | 'id'> {
    id?: string;
}

interface ILike extends Omit<Like, '__typename' | 'id'> {
    id?: string;
}

interface IPost extends Omit<Post, '__typename' | 'id' | 'comments' | 'likes'> {
    comments: Array<IComment>;
    likes: Array<ILike>;
    user: any;
}

type PostModel = Model<IPost>;

const postSchema = new Schema<IPost, PostModel>({
    body: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        required: true,
    },
    comments: [
        {
            body: {
                type: String,
                required: true,
            },
            username: {
                type: String,
                required: true,
            },
            createdAt: {
                type: String,
                required: true,
            },
        },
    ],
    likes: [
        {
            username: {
                type: String,
                required: true,
            },
            createdAt: {
                type: String,
                required: true,
            },
        },
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
});

export default model<IPost>('Post', postSchema);
