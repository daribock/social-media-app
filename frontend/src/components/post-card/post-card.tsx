import moment from 'moment';
import { Post } from '../../__generated__/graphql';

interface PostCardProps {
    post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
    const { body, createdAt, username, id, commentCount, likeCount } = post;
    const date = moment(createdAt).fromNow(true);
    const title = 'test';

    return (
        <article
            key={id}
            className="flex max-w-xl flex-col items-start justify-between p-2 lg:p-4 overflow-hidden rounded-lg shadow transition hover:shadow-lg"
        >
            <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-500">
                <div className="flex items-center gap-x-2">
                    <div className="flex gap-x-2">
                        <img
                            alt="avatar"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80 "
                            className="h-6 w-6 flex-none rounded-full bg-white/10"
                        />
                        <p>{username}</p>
                    </div>
                    <svg viewBox="0 0 2 2" className=" h-0.5 w-0.5 flex-none fill-white/200">
                        <circle r={1} cx={1} cy={1} />
                    </svg>
                    <time dateTime={date} className="mr-8">
                        {date}
                    </time>
                </div>
            </div>
            <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <span className="absolute inset-0" />
                    {title}
                </h3>
                <p className="mt-1 line-clamp-3 text-sm leading-6 text-gray-600">{body}</p>
            </div>
            <div className="relative mt-3 flex items-center gap-x-4">
                <button className="flex items-center gap-x-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                        />
                    </svg>
                    {likeCount}
                </button>
                <button className="flex items-center gap-x-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                        />
                    </svg>
                    {commentCount}
                </button>
            </div>
        </article>
    );
};

export default PostCard;
