import { gql, TypedDocumentNode, useMutation } from '@apollo/client';
import { Card, CardHeader, CardBody, Typography, Input, Button, Alert } from '@material-tailwind/react';
import { useState } from 'react';
import { IssueSeverity, LoginInput, Mutation, ValidationResult } from '../__generated__/graphql';
import { useForm } from '../utils/hook';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';

type TLoginForm = {
    username: string;
    password: string;
};

interface MutationLoginResult {
    login: Mutation['login'];
}

const LOGIN_USER: TypedDocumentNode<MutationLoginResult, LoginInput> = gql`
    mutation login($username: String!, $password: String!) {
        login(loginInput: { username: $username, password: $password }) {
            id
            email
            username
            createdAt
            token
        }
    }
`;

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [validationResult, setvalidationResult] = useState<ValidationResult>({ hasErrors: false, issues: [] });

    const userNameIssues = validationResult.issues.filter((issue) => issue.location?.includes('username'));
    const passwordIssues = validationResult.issues.filter((issue) => issue.location?.includes('password'));

    const { onChange, onSubmit, values } = useForm<TLoginForm>(loginUserCallBack, {
        username: '',
        password: '',
    });

    const { username, password } = values;

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, { data }) {
            if (data) {
                login(data.login);
                setvalidationResult({ hasErrors: false, issues: [] });
                navigate('/');
            } else {
                setvalidationResult({
                    hasErrors: true,
                    issues: [{ message: 'No data', severity: IssueSeverity.Error }],
                });
            }
        },
        onError(err) {
            console.log('graphqlerror', err.graphQLErrors[0].extensions);
            setvalidationResult(err.graphQLErrors[0].extensions.validationResult as ValidationResult);
        },
        variables: values,
    });

    function loginUserCallBack() {
        console.log('registerUser');
        loginUser();
    }

    function Icon() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                <path
                    fillRule="evenodd"
                    d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }

    console.log('validationResult, open', validationResult, open);

    return (
        <div className="flex min-h-full justify-center px-6 py-24 lg:py-36 lg:px-8">
            <Card className="min-w-96">
                <CardHeader variant="gradient" color="gray" className="mb-4 grid h-28 place-items-center">
                    <Typography variant="h3" color="white">
                        Login
                    </Typography>
                </CardHeader>
                <CardBody className="space-y-8">
                    {loading ? (
                        <div className="max-w-full animate-pulse space-y-8">
                            <Typography as="div" variant="paragraph" className="mb-2 h-2 w-72 rounded-full bg-gray-300">
                                &nbsp;
                            </Typography>
                            <Typography as="div" variant="paragraph" className="mb-2 h-2 w-72 rounded-full bg-gray-300">
                                &nbsp;
                            </Typography>
                            <Typography as="div" variant="paragraph" className="mb-2 h-2 w-72 rounded-full bg-gray-300">
                                &nbsp;
                            </Typography>
                            <Typography as="div" variant="paragraph" className="mb-2 h-2 w-72 rounded-full bg-gray-300">
                                &nbsp;
                            </Typography>
                        </div>
                    ) : (
                        <form onSubmit={onSubmit} className="flex flex-col gap-4">
                            <Input
                                value={username}
                                name="username"
                                required
                                onChange={onChange}
                                label="Username"
                                size="lg"
                                {...(userNameIssues.length ? { error: true } : {})}
                            />
                            <Input
                                value={password}
                                id="password"
                                name="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                onChange={onChange}
                                label="Password"
                                size="lg"
                                {...(passwordIssues.length ? { error: true } : {})}
                            />
                            <Button variant="gradient" type="submit" fullWidth>
                                Login
                            </Button>
                        </form>
                    )}
                    {validationResult.hasErrors && (
                        <Alert variant="gradient" color="red" icon={Icon()}>
                            <Typography className="font-medium">Errors:</Typography>
                            <ul className="mt-2 ml-2 list-inside list-disc">
                                {validationResult.issues.map((issue) => (
                                    <li>{issue.message}</li>
                                ))}
                            </ul>
                        </Alert>
                    )}
                </CardBody>
            </Card>
        </div>
    );
};

export default Login;
