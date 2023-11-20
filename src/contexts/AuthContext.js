import { createContext, useReducer, useContext, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import * as SplashScreen from 'expo-splash-screen';
import { api } from '../constants';

const AuthContext = createContext();

const initialState = {
    user: null,
    loading: true,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload, loading: false };
        case 'LOGOUT':
            return { ...state, user: null, loading: false };
        default:
            return state;
    }
};

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const checkUserInSecureStore = async () => {
            try {
                const storedUser = await SecureStore.getItemAsync('h027_account_state');
                if (storedUser) {
                    const userObject = JSON.parse(storedUser);

                    const response = await api.get('/api/streamy/authenticationv2-verify-account', { params: { name: userObject.name } });

                    if (response) {
                        if (response.data.state) {
                            dispatch({ type: 'SET_USER', payload: userObject });
                        } else {
                            // console.log(response.data.error);
                            logout();
                        }
                    }
                }
            } catch (error) {
                console.error('Error retrieving user from secure store', error);
            } finally {
                await new Promise((resolve) => setTimeout(resolve, 2000));
                await SplashScreen.hideAsync();
            }
        };

        checkUserInSecureStore();
    }, []);

    const setUser = async (user) => {
        try {
            await SecureStore.setItemAsync('h027_account_state', JSON.stringify(user));
            dispatch({ type: 'SET_USER', payload: user });
        } catch (error) {
            console.error('Error storing user in secure store', error);
        }
    };

    const logout = async () => {
        try {
            await SecureStore.deleteItemAsync('h027_account_state');
            dispatch({ type: 'LOGOUT' });
        } catch (error) {
            console.error('Error deleting user from secure store', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user: state.user, loading: state.loading, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};

export { AuthProvider, useAuthContext };
