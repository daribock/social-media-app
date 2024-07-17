import { gql, TypedDocumentNode, useQuery } from '@apollo/client';
import { Query } from '../__generated__/graphql';
import PostCard from '../components/post-card/post-card';

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

const Home = () => {
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
        <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Posts</h2>
                </div>
                {renderPosts()}
            </div>
        </div>
    );
};

export default Home;
