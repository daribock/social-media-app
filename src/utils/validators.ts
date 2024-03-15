import { RegisterInput } from "../generated/graphql.js";

type ValidateRegisterInputProps = RegisterInput;
type ValidateRegisterInputErrors = Partial<RegisterInput>;

const validateRegisterInput = ({
  username,
  email,
  password,
  confirmPassword,
}: ValidateRegisterInputProps) => {
  const errors: ValidateRegisterInputErrors = {};

  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }

  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    const regEx = "";
  }
};

export default validateRegisterInput;
