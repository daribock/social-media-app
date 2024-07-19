import { Button, Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const error = useRouteError() as any;

    return (
        <div className="h-screen mx-auto grid place-items-center text-center px-8">
            <div>
                <Typography variant="h1" color="red" className="mt-10 !text-3xl !leading-snug md:!text-4xl">
                    Error: {error.statusText || error.message}
                </Typography>
                <Typography className="mt-8 mb-14 text-[18px] font-normal text-gray-500 mx-auto md:max-w-sm">
                    Something went wrong. Please try refreshing the page or come back later.
                </Typography>
                <Link to="/">
                    <Button color="gray" className="w-full px-4 md:w-[8rem]">
                        back home
                    </Button>
                </Link>
            </div>
        </div>
    );
}
