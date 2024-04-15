import { UserInputError } from 'apollo-server';
import * as bycrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import config from '../../config';
import User, { IUser } from '../../models/User';
import { validateLoginInput, validateRegisterInput } from '../../utils/validators';
import { IssueSeverity, MutationRegisterArgs, MutationResolvers, Resolvers } from '../../generated/graphql';
import { HydratedDocument } from 'mongoose';

const generateToken = (user: HydratedDocument<IUser>) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username,
        },
        config.SECRET_KEY,
        { expiresIn: '1h' }
    );
};

const login: MutationResolvers['login'] = async (_, { loginInput }) => {
    const { username, password } = loginInput;
    const { issues, hasErrors } = validateLoginInput(loginInput);
    const user = await User.findOne({ username });

    if (hasErrors) {
        throw new UserInputError('Errors', { issues });
    }

    if (!user) {
        issues.push({ message: 'User not found', severity: IssueSeverity.Error });
        throw new UserInputError('User not found', { issues });
    }

    const match = await bycrypt.compare(password, user.password);
    if (!match) {
        issues.push({ message: 'Wrong credentials', severity: IssueSeverity.Error });
        throw new UserInputError('Wrong credentials', { issues });
    }

    const token = generateToken(user);

    return {
        ...user.toObject(),
        id: user.id,
        token,
    };
};

const register: MutationResolvers['register'] = async (_: any, { registerInput }: MutationRegisterArgs) => {
    const { username, password, email } = registerInput;

    // Validate user data
    const { issues, hasErrors } = validateRegisterInput(registerInput);

    if (hasErrors) {
        throw new UserInputError('Errors', { issues });
    }
    // Make sure user doesn't already exist
    const user = await User.findOne({ username });

    if (user) {
        throw new UserInputError('Username is taken', {
            errors: {
                username: 'This username is taken',
            },
        });
    }

    // Hash password and create an auth token
    const hashedPassword: string = await bycrypt.hash(password, 12);
    const createdAt: string = new Date().toISOString();

    const newUser: HydratedDocument<IUser> = new User<IUser>({
        email,
        username,
        password: hashedPassword,
        createdAt,
    });

    const res: HydratedDocument<IUser> = await newUser.save();

    const token = generateToken(res);

    return {
        ...res.toObject(),
        id: res.id,
        token,
    };
};

const usersResolver: Resolvers = {
    Mutation: {
        register,
        login,
    },
};

export default usersResolver;
