import { Typography } from '@material-tailwind/react';
import Navbar from './navbar/navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
            <footer className="mt-auto">
                <hr className="my-8 border-blue-gray-50" />
                <Typography color="blue-gray" className="text-center font-normal">
                    &copy; 2023 JISK
                </Typography>
            </footer>
        </>
    );
};

export default Layout;
