import { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { clearLocalStorage } from '../utils/helper';
import { AuthContext } from '../contexts/auth-context';

const Logout = () => {
    const history = useHistory();
    const { setAuth } = useContext(AuthContext)
    useEffect(() => {
        setAuth(null);
        clearLocalStorage();
        return () => {
            history.replace('/login')
            window.location.reload()

        }
    }, [setAuth, history])

    return null
}

export default Logout;
