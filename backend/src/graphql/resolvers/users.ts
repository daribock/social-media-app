import { UserInputError } from 'apollo-server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import config from '../../config';
import User, { IUser } from '../../models/User';
import { validateLoginInput, validateRegisterInput } from '../../utils/validators';
import { IssueSeverity, MutationRegisterArgs, MutationResolvers, Resolvers } from '../../generated/generated-types';
import { HydratedDocument } from 'mongoose';

const generateToken = (user: HydratedDocument<IUser>): Readonly<string> => {
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
    const validationResult = validateLoginInput(loginInput);
    const user = await User.findOne({ username });

    if (validationResult.hasErrors) {
        throw new UserInputError('Errors', { validationResult: validationResult });
    }

    if (!user) {
        validationResult.hasErrors = true;
        validationResult.issues.push({
            location: 'username',
            message: 'User not found',
            severity: IssueSeverity.Error,
        });

        throw new UserInputError('Errors', { validationResult: validationResult });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        validationResult.hasErrors = true;
        validationResult.issues.push({
            location: 'password',
            message: 'Wrong credentials',
            severity: IssueSeverity.Error,
        });

        throw new UserInputError('Errors', { validationResult: validationResult });
    }

    const token = generateToken(user);

    return {
        ...user.toObject(),
        id: user.id,
        token,
    };
};

const register: MutationResolvers['register'] = async (_, { registerInput }) => {
    const { username, password, email } = registerInput;

    // Validate user data
    const validationResult = validateRegisterInput(registerInput);

    // Make sure user doesn't already exist
    const user = await User.findOne({ username });

    if (user) {
        validationResult.issues.push({
            location: 'username',
            message: 'This username is taken',
            severity: IssueSeverity.Error,
        });
    }

    validationResult.hasErrors = !!validationResult.issues.length;

    if (validationResult.hasErrors) {
        throw new UserInputError('Errors', { validationResult: validationResult });
    }

    // Hash password and create an auth token
    const hashedPassword: string = await bcrypt.hash(password, 12);
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
