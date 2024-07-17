import { Link } from 'react-router-dom';
import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const error = useRouteError() as any;

    return (
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="text-base font-semibold text-purple-600">{error.statusText || error.message}</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Oops!</h1>
                <p className="mt-6 text-base leading-7 text-gray-600">Sorry, an unexpected error has occurred.</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link to="/home" className="btn btn-primary">
                        Go back home
                    </Link>
                </div>
            </div>
        </main>
    );
}
