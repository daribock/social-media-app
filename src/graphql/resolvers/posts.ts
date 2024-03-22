import Post from '../../models/Post.js';

const postsResolver = {
    Query: {
        getPosts: async () => {
            try {
                const posts = await Post.find();
                return posts;
            } catch (err) {
                throw new Error(err as string);
            }
        },
    },
};

export default postsResolver;
