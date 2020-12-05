import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { clearLocalStorage } from '../utils/helper';
import { AuthContext } from '../contexts/auth-context';

<<<<<<< HEAD
const Logout = () => {
    const history = useHistory();
    const { setAuth } = useContext(AuthContext);
    useEffect(() => {
        setAuth(null);
        clearLocalStorage();
        return () => {
            history.replace('/login');
            window.location.reload();
        };
    }, [setAuth, history]);
=======
const Logout = ({ isDoctor }) => {
  const history = useHistory();
  const { setAuth } = useContext(AuthContext);
  const URL = isDoctor ? '/doctors/login' : '/login';
  useEffect(() => {
    setAuth(null);
    clearLocalStorage();
    return () => {
      history.replace(URL);
      window.location.reload();
    };
  }, [setAuth, history]);
>>>>>>> 736f57c467171356649034616136b1eee46927cf

    return null;
};

export default Logout;
