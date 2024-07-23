import { Button, Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/auth';

const Hero = () => {
    const { user, loading } = useAuth();

    return (
        <section className="mx-auto max-w-2xl py-16 sm:py-34 lg:py-48">
            <div className="text-center">
                <Typography variant="h1" className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    Jesus is King
                </Typography>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                    Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt
                    amet fugiat veniam occaecat fugiat aliqua.
                </p>
                {!user && !loading && (
                    <div className="mt-10 ">
                        <Link to="/login">
                            <Button variant="gradient" size="sm">
                                <span>Sign in</span>
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Hero;
