import { Typography } from '@material-tailwind/react';
import { useAuth } from '../context/auth';
import PostSection from '../components/post-section/post-section';

const Home = () => {
    const { user } = useAuth();

    return (
        <>
            <section className="py-12 sm:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Typography variant="h1">Jesus is King</Typography>
                </div>
            </section>
            {user && <PostSection />}
        </>
    );
};

export default Home;
