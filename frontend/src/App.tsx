import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Register from './pages/register';
import Home from './pages/home';
import Login from './pages/login';
import Layout from './components/layout/layout';
import ErrorPage from './pages/error-page';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'register',
                element: <Register />,
            },
        ],
    },
]);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
