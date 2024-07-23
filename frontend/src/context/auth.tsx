import React, { useReducer, createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { User } from '../__generated__/graphql'; // Adjust this import based on your generated files

interface AuthState {
    user: User | null;
}

interface AuthContextProps {
    user: User | null;
    loading: boolean;
    login: (userData: User) => void;
    logout: () => void;
}

interface AuthAction {
    type: 'LOGIN' | 'LOGOUT';
    payload?: User | null;
}

const initialState: AuthState = {
    user: null,
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload || null,
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
            };
        default:
            return state;
    }
};

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            const decodedToken: any = jwtDecode(token);
            console.log(decodedToken);
            if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
                localStorage.removeItem('jwtToken');
            } else {
                dispatch({
                    type: 'LOGIN',
                    payload: decodedToken,
                });
            }
        }
    }, []);

    const login = (userData: User) => {
        localStorage.setItem('jwtToken', userData.token);
        dispatch({
            type: 'LOGIN',
            payload: userData,
        });
    };

    const logout = () => {
        localStorage.removeItem('jwtToken');
        dispatch({ type: 'LOGOUT' });
    };

    setTimeout(() => {
        setLoading(false);
    }, 200);

    return <AuthContext.Provider value={{ user: state.user, loading, login, logout }}>{children}</AuthContext.Provider>;
};

const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { AuthProvider, useAuth };
