import { AuthenticationContext } from '@/app/context/AuthContext';
import axios from 'axios';
import { getCookie, removeCookies } from 'cookies-next';
import { useContext } from 'react';

const useAuth = () => {

    const { setAuthState } = useContext(AuthenticationContext);

    const signIn = async ({ email, password, handleClose }: { email: string, password: string, handleClose: () => void }) => {
        setAuthState({ data: null, error: null, loading: true });
        try {
            const response = await axios.post("http://localhost:3000/api/signin", {
                email,
                password
            });
            handleClose();
            setAuthState({ data: response.data, error: null, loading: false });
        }
        catch (error: any) {
            setAuthState({ data: null, error: error.response.data.errorMessage, loading: false });
        }
    }
    const signUp = async ({ firstName, lastName, phone, city, email, password, handleClose }: { firstName: string, lastName: string, phone: string, city: string, email: string, password: string, handleClose: () => void }) => {

        setAuthState({ data: null, error: null, loading: true });
        try {
            const response = await axios.post("http://localhost:3000/api/signup", {
                firstName,
                lastName,
                phone,
                city,
                email,
                password
            });
            handleClose();
            setAuthState({ data: response.data, error: null, loading: false });
        }
        catch (error: any) {
            setAuthState({ data: null, error: error.response.data.errorMessage, loading: false });
        }
    }
    const logout = async () => {
        removeCookies("jwt");
        setAuthState({ data: null, error: null, loading: false });
    }


    return {
        signIn,
        signUp,
        logout
    }
}

export default useAuth;