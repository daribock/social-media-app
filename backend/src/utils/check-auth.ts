import { AuthenticationError } from 'apollo-server';
import jwt from 'jsonwebtoken';

import config from '../config/index';
import { User } from '../generated/generated-types';

const { SECRET_KEY } = config;

const checkAuth = (context: any): User => {
    // context = { ... headers }
    const authHeader = context.req.headers.authorization;

    if (authHeader) {
        // Bearer ....
        const token: string = authHeader.split('Bearer ')[1];

        if (token) {
            try {
                const user = jwt.verify(token, SECRET_KEY) as User;

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
