import moment from 'moment';
import { Card, CardBody, CardFooter, Typography, IconButton, Avatar } from '@material-tailwind/react';
import { Post } from '../../../__generated__/graphql';
import { ArrowTopRightOnSquareIcon, ChatBubbleOvalLeftIcon, HeartIcon } from '@heroicons/react/24/outline';

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
                        <IconButton variant="text">
                            <HeartIcon className="size-6" />
                        </IconButton>
                        <IconButton variant="text">
                            <ChatBubbleOvalLeftIcon className="size-6" />
                        </IconButton>
                        <IconButton variant="text">
                            <ArrowTopRightOnSquareIcon className="size-6" />
                        </IconButton>
                    </div>
                </CardFooter>
            </Card>
        </article>
    );
};

export default PostCard;
