import { Navbar as MaterialNavbar, Typography, Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/auth';
import ProfileMenu from './partials/profile-menu/profile-menu';

const Navbar = () => {
    const { user, loading } = useAuth();

    return (
        <MaterialNavbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
            <div className="flex items-center justify-between text-blue-gray-900">
                <Typography as="a" href="/" className="mr-4 cursor-pointer py-1.5 font-medium">
                    Jesus is King
                </Typography>
                {loading ? null : user ? (
                    <ProfileMenu userData={user} />
                ) : (
                    <Link to="/login">
                        <Button variant="gradient" size="sm">
                            <span>Sign in</span>
                        </Button>
                    </Link>
                )}
            </div>
        </MaterialNavbar>
    );
};

export default Navbar;
