import { Link } from 'react-router-dom';
import { BackgroundGradientAnimation } from '../components/background-gradient-animation/background-gradient-animation';

const Home = () => {
    return (
        <BackgroundGradientAnimation>
            <div
                className="absolute z-50 inset-0 flex items-center 
            flex-col justify-center space-y-5"
            >
                <div className="text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
                    <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
                        JSK Social media app
                    </p>
                </div>
                <div className="space-x-5">
                    <Link to="/login" className="btn btn-primary">
                        Login
                    </Link>
                    <Link to="/register" className="btn btn-">
                        Register
                    </Link>
                </div>
            </div>
        </BackgroundGradientAnimation>
    );
};

export default Home;
