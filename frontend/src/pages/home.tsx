import { useAuth } from '../context/auth';
import PostSection from '../components/ui/post-section/post-section';
import Hero from '../components/ui/hero/hero';

const Home = () => {
    const { user } = useAuth();

    return (
        <>
            <Hero />
            {user && <PostSection />}
        </>
    );
};

export default Home;
