import { useAuthContext } from './useAuthContext';

export const useSignout = () => {

    const {dispatch} = useAuthContext();
    const signout = () => {
        localStorage.removeItem('user');
        dispatch({ type: 'SIGNOUT' });
    }

    return { signout }
}