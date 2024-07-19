import {
    IssueSeverity,
    LoginInput,
    RegisterInput,
    ValidationIssue,
    ValidationResult,
} from '../generated/generated-types';

export const validateRegisterInput = ({
    username,
    email,
    password,
    confirmPassword,
}: RegisterInput): ValidationResult => {
    const issues: ValidationIssue[] = [];

    // Validate username
    if (username.trim() === '') {
        issues.push({
            location: 'username',
            message: 'Username must not be empty',
            severity: IssueSeverity.Error,
        });
    }

    // Validate email
    if (email.trim() === '') {
        issues.push({ location: 'email', message: 'Email must not be empty', severity: IssueSeverity.Error });
    } else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

        if (!email.match(regEx)) {
            issues.push({
                location: 'email',
                message: 'Email must be a valid email address',
                severity: IssueSeverity.Error,
            });
        }
    }

    // Validate password
    if (password === '') {
        issues.push({ location: 'password', message: 'Password must not be empty', severity: IssueSeverity.Error });
    } else if (password !== confirmPassword) {
        issues.push({ location: 'confirmPassword', message: 'Passwords must match', severity: IssueSeverity.Error });
    }

    return {
        hasErrors: !!issues.length,
        issues,
    };
};

export const validateLoginInput = ({ username, password }: LoginInput): ValidationResult => {
    const issues: ValidationIssue[] = [];

    // Validate username
    if (username.trim() === '') {
        issues.push({
            location: 'username',
            message: 'Username must not be empty',
            severity: IssueSeverity.Error,
        });
    }

    // Validate password
    if (password.trim() === '') {
        issues.push({ location: 'password', message: 'Password mus not be empty', severity: IssueSeverity.Error });
    }

    return {
        issues,
        hasErrors: !!issues.length,
    };
};
