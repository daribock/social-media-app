import { UserInputError } from "apollo-server";
import config from "../../config/config.js";
import { MutationResolvers } from "../../generated/graphql.js";
import User from "../../models/User.js";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (_: any, { registerInput }: any) => {
  const { username, password, email, confirmPassword } = registerInput;

  // TODO: validate user data
  // TODO: make sure user doesn't already exist
  const user = await User.findOne({ username });

  if (user) {
    throw new UserInputError("Username is taken", {
      errors: {
        username: "This username is taken",
      },
    });
  }

  // Hash password and create an auth token

  const hashedPassword: string = await bycrypt.hash(password, 12);
  const createdAt: string = new Date().toISOString();

  const newUser = new User({
    email,
    username,
    hashedPassword,
    createdAt,
  });

  const res = await newUser.save();

  const token = jwt.sign(
    {
      id: res.id,
      email: res.email,
      username: res.username,
    },
    config.SECRET_KEY,
    { expiresIn: "1h" },
  );

  return {
    ...res.toObject(),
    id: res._id,
    token,
  };
};

const usersResolver = {
  Mutation: {
    register,
  },
};

export default usersResolver;
