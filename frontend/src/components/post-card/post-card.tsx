import moment from 'moment';
import { Card, CardBody, CardFooter, Typography, IconButton, Avatar } from '@material-tailwind/react';
import { Post } from '../../__generated__/graphql';

interface PostCardProps {
    post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
    const { body, createdAt, username, id, commentCount, likeCount } = post;
    const date = moment(createdAt).format('L');
    const timeFromNow = moment(createdAt).fromNow(true);

    const renderDots = () => {
        return (
            <svg viewBox="0 0 2 2" className=" h-0.5 w-0.5 flex-none fill-white/200">
                <circle r={1} cx={1} cy={1} />
            </svg>
        );
    };

    return (
        <article key={id}>
            <Card>
                <CardBody className="space-y-6">
                    <div className="flex items-center gap-4">
                        <Avatar
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="avatar"
                        />
                        <div>
                            <Typography variant="h6">{username}</Typography>
                            <div className="flex items-center gap-2">
                                <time dateTime={date}>
                                    <Typography variant="small">{date}</Typography>
                                </time>
                                {renderDots()}
                                <Typography variant="small">{timeFromNow} ago</Typography>
                            </div>
                        </div>
                    </div>
                    <Typography>{body}</Typography>
                </CardBody>
                <CardFooter className="pt-0">
                    <div className="flex items-center gap-2 py-2 border-t">
                        <Typography className="flex justify-center">
                            <Typography className="font-bold mr-1">{likeCount}</Typography>
                            Likes
                        </Typography>
                        {renderDots()}
                        <Typography className="flex justify-center">
                            <Typography className="font-bold mr-1">{commentCount}</Typography>
                            Comments
                        </Typography>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t">
                        <IconButton variant="text" className=" flex items-center  p-2 gap-x-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                                />
                            </svg>
                        </IconButton>
                        <IconButton variant="text" className="flex items-center p-2 gap-x-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                                />
                            </svg>
                        </IconButton>
                        <IconButton variant="text" className="flex items-center p-2 gap-x-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                                />
                            </svg>
                        </IconButton>
                    </div>
                </CardFooter>
            </Card>
        </article>
    );
};

export default PostCard;
