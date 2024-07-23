import { gql, TypedDocumentNode, useQuery } from '@apollo/client';
import React from 'react';
import { Query } from '../../../__generated__/graphql';
import PostCard from '../post-card/post-card';
import { Typography } from '@material-tailwind/react';

interface GetPostsQuery {
    getPosts: Query['getPosts'];
}

const GET_POSTS_QUERY: TypedDocumentNode<GetPostsQuery> = gql`
    query GetPosts {
        getPosts {
            id
            body
            createdAt
            username
            likeCount
            commentCount
            likes {
                username
            }
            comments {
                createdAt
                username
            }
        }
    }
`;

const PostSection = () => {
    const { loading, data } = useQuery(GET_POSTS_QUERY);

    const renderPosts = () => {
        if (!data?.getPosts.length) {
            return null;
        }

        const { getPosts } = data;

        return loading ? (
            <div className="skeleton h-32 w-32"></div>
        ) : (
            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {getPosts.map((post) => {
                    return <PostCard post={post} />;
                })}
            </div>
        );
    };

    return (
        <section className="py-4 sm:py-12">
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <Typography variant="h2">Posts</Typography>
                </div>
                {renderPosts()}
            </div>
        </section>
    );
};

export default PostSection;
