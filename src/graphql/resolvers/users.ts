import User from "../../models/User.js";
import { RegisterInput } from "../../generated/graphql.js";

export default {
  Mutation: {
    register: (
      _,
      { confirmPassword, email, password, username }: RegisterInput,
      context,
      info,
    ) => {
      // TODO: validate user data
      // TODO: make sure user doesn't already exist
      // TODO: hash password and create an auth token
    },
  },
};
