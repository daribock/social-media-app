import { AuthenticationError } from 'apollo-server';

import * as jwt from 'jsonwebtoken';
import config from '../config/index.js';

const { SECRET_KEY } = config;

const checkAuth = (context: any) => {
    // context = { ... headers }
    const authHeader = context.req.headers.authorization;

    if (authHeader) {
        // Bearer ....
        const token = authHeader.split('Bearer ')[1];

        if (token) {
            try {
                const user = jwt.verify(token, SECRET_KEY);

                return user;
            } catch (err) {
                throw new AuthenticationError('Invalid/Expired token');
            }
        }

        throw new Error("Authentication token must be 'Bearer [token]");
    }

    throw new Error('Authorization header must be provided');
};

export default checkAuth;
